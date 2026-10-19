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
import { groupByEnrollment, readEventsByEnrollments } from '../../../utils/common/eventsByEnrollment';
import { useGetEvents, useIncrementDays, useUrlParams } from "dhis2-semis-functions";
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
    const selectedCalendar = schoolCalendar?.find(x => x?.academicYear?.code == defaults?.academicYear)
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
    const { getDate } = useIncrementDays()

    async function exportData({ fileName, numberOfEmptyRows, startDate, endDate }: { fileName?: string, startDate?: any, endDate?: any, numberOfEmptyRows?: number }) {
        if (!valid) onError(`Export error: ${msg}`)
        else {

            if (empty && module != Modules.Enrollment) {
                onError('Export error: The empty variable only applies to the enrollment module!')
            } else {
                setProgress((prev: any) => ({ ...prev, progress: 1, buffer: 10 }))
                let data: any = []
                const { filters, formatedHeaders, attributesToGenerate, defaultLockedHeaders } = getHeaders(startDate, endDate)
                const metadata = getMetaData(programConfig, stagesToExport)

                if (!empty) data = await getData()

                if (module != Modules.Enrollment) {
                    // Each program stage is read once for the whole class (by enrollment, in groups and
                    // with paging) and joined in memory, instead of one request per person and stage.
                    const enrollments = data?.map((row: any) => row?.enrollment) ?? []

                    for (const stageId of stagesToExport ?? []) {
                        try {
                            const eventsByEnrollment = groupByEnrollment(await readEventsByEnrollments(getEvents, {
                                program: selectedSectionDataStore?.program as unknown as string,
                                ...(module === Modules.Attendance ? {
                                    occurredAfter: startDate,
                                    occurredBefore: getDate({ selectedDate: new Date(endDate) }),
                                } : {}),
                                orgUnit,
                                orgUnitMode: "SELECTED",
                                programStage: stageId,
                                fields: "event,trackedEntity,occurredAt,enrollment,dataValues[dataElement,value]",
                            }, enrollments))

                            data = (data ?? []).map((row: any) => ({
                                ...row, ...formatSheetData({
                                    module: module,
                                    stageId,
                                    events: eventsByEnrollment[row?.enrollment] ?? [],
                                    dataStore: selectedSectionDataStore as unknown as selectedDataStoreKey
                                })
                            }))
                        } catch (error) {
                            setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                            onError(`Export error: Occurred error wihile fetching data: ${error}`)
                        }

                        setProgress((prev: any) => ({
                            ...prev,
                            progress: prev.progress + 40 / stagesToExport.length,
                            buffer: prev.buffer + 41 / stagesToExport.length
                        }));
                    }
                } else if (empty && module == Modules.Enrollment) {
                    let ids: any = {}

                    for (const attr of attributesToGenerate) {
                        await generate({
                            studentsNumber: numberOfEmptyRows,
                            attributeID: attr?.attributeID,
                            pattern: attr?.pattern,
                            orgUnitId: orgUnit,
                            onError: () => onError(`Export error: Occurred error wihile generating ids for attribute ${attr?.attributeID}`)
                        }).then((generatedIds: any) => {
                            ids[attr.attributeID] = generatedIds?.result?.map((x: any) => x.value)
                        })
                            .then(() => setProgress((progress: any) => ({ ...progress, progress: 80 / attributesToGenerate.length, buffer: 82 / attributesToGenerate.length })))
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