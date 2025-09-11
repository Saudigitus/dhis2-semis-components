import { ExportData } from "../../../types/bulk/bulkOperations";
import { formatSheetData } from "../../../utils/format/formatSheetData";
import { selectedDataStoreKey, Modules } from 'dhis2-semis-types';
import { getMetaData } from '../../../utils/excelMetadata/getMetadata';
import { generateHeaders } from './excelHeaders/generateExcelHeaders';
import { getCommonSheetData } from './useGetCommonData/commonData';
import { generateFile } from './dataExporter/fileGenerator';
import { generateEmptyRows } from '../../../utils/common/generateData';
import { generateAndReserveIds } from './generateIds/generateAndReserve';
import { areParamsValid } from '../../../utils/common/validateRequiredParams';
import { useGetEvents, useUrlParams } from "dhis2-semis-functions";
import { useSchoolCalendarKey } from "../../../hooks/dataStore/useSchoolCalendarKey";
import { SchoolCalendarType } from "../../../types/dataStore/schoolCalendar";

export function useExportData(props: ExportData) {
    const {
        programConfig,
        isSchoolDay,
        stagesToExport,
        module,
        selectedSectionDataStore,
        withSocioEconomics = false,
        sectionType,
        empty = false,
        setProgress = () => { },
        onError,
    } = props
    const { getData } = getCommonSheetData({ ...props, onError })
    const { urlParameters } = useUrlParams()
    const { schoolName: orgUnitName, school: orgUnit } = urlParameters
    const { getEvents } = useGetEvents()
    const { generate } = generateAndReserveIds()
    const { defaults, schoolCalendar } = useSchoolCalendarKey()
    const selectedCalendar = schoolCalendar?.find(x => x?.academicYear?.code== defaults?.academicYear)
    const { excelGenerator } = generateFile({ unavailableDays: isSchoolDay as unknown as (date: Date, config: SchoolCalendarType) => boolean, config: selectedCalendar })
    const { getHeaders } = generateHeaders({
        module,
        programConfig,
        stagesToExport,
        selectedSectionDataStore,
        sectionType,
        withSocioEconomics,
        empty
    })
    const { msg, valid } = areParamsValid({ ...props })

    async function exportData({ fileName, numberOfEmptyRows, startDate, endDate }: { fileName?: string, startDate?: any, endDate?: any, numberOfEmptyRows?: number }) {
        if (!valid) onError(`Export error: ${msg}`)
        else {

            if (empty && module != Modules.Enrollment) {
                onError('Export error: The empty variable only applies to the enrollment module!')
            } else {
                setProgress((prev: any) => ({ ...prev, progress: 1, buffer: 10 }))
                let data: any = []
                const { filters, formatedHeaders, toGenerate, defaultLockedHeaders } = getHeaders(startDate, endDate)
                const metadata = getMetaData(programConfig, stagesToExport)

                if (!empty) data = await getData()

                if (module != Modules.Enrollment) {
                    for (let teisCounter = 0; teisCounter < data.length; teisCounter++) {
                        for (let a = 0; a < stagesToExport.length; a++) {
                            await getEvents({
                                program: selectedSectionDataStore?.program as unknown as string,
                                ...(module === Modules.Attendance ? {
                                    occurredAfter: startDate,
                                    occurredBefore: endDate
                                } : {}),
                                orgUnit,
                                ouMode: "SELECTED",
                                programStage: stagesToExport[a],
                                fields: "event,trackedEntity,occurredAt,enrollment,dataValues[dataElement,value]",
                                trackedEntity: data[teisCounter].trackedEntity,
                                skipPaging: true
                            }).then((resp) => {
                                const events = resp?.filter((x: any) => x.enrollment === data[teisCounter].enrollment)
                                const increment = (40 / data.length) / stagesToExport.length;
                                const bufferIncrement = (41 / data.length) / stagesToExport.length;

                                data[teisCounter] = {
                                    ...data[teisCounter], ...formatSheetData({
                                        module: module,
                                        stageId: stagesToExport[a],
                                        events: events,
                                        dataStore: selectedSectionDataStore as unknown as selectedDataStoreKey
                                    })
                                }

                                setProgress((prev: any) => ({
                                    ...prev,
                                    progress: prev.progress + increment,
                                    buffer: prev.buffer + bufferIncrement
                                }));

                            }).catch((error) => {
                                setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                                onError(`Export error: Occurred error wihile fetching data: ${error}`)
                            })
                        }
                    }
                } else if (empty && module == Modules.Enrollment) {
                    let ids: any = {}

                    for (const idToGenerate of toGenerate) {
                        await generate(numberOfEmptyRows, idToGenerate).then((generatedIds: any) => {
                            ids[idToGenerate] = generatedIds?.result?.map((x: any) => x.value)
                        })
                            .then(() => setProgress((progress: any) => ({ ...progress, progress: 80 / toGenerate.length, buffer: 82 / toGenerate.length })))
                            .catch((error) => {
                                onError(`Export error: ${error}`)
                                setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                            })
                    }

                    data = generateEmptyRows(numberOfEmptyRows, formatedHeaders, ids, orgUnitName)
                }

                try {
                    await excelGenerator({ headers: formatedHeaders, rows: data, filters, fileName, metadata, module, empty, defaultLockedHeaders })
                } catch (error) {
                    onError(`Export error: Occurred an error while generating file! - ${error}`)
                } finally {
                    setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                }
            }
        }
    }

    return { exportData }
}