import { ExportData } from "../../../types/bulk/bulkOperations";
import { formatSheetData } from "../../../utils/format/formatSheetData";
import { DataStoreRecord } from "../../../types/dataStore/DataStoreConfig";
import { getMetaData } from '../../../utils/excelMetadata/getMetadata';
import { generateHeaders } from './excelHeaders/generateExcelHeaders';
import { getCommonSheetData } from './useGetCommonData/commonData';
import { generateFile } from './dataExporter/fileGenerator';
import { modules } from '../../../types/common/moduleTypes';
import { generateEmptyRows } from '../../../utils/common/generateData';
import { areParamsValid } from '../../../utils/common/validateRequiredParams';
import { useGetEvents } from "../../../hooks/events/useGetEvents";

export function useExportData(props: ExportData) {
    const {
        programConfig,
        fileName,
        isSchoolDay,
        orgUnit,
        stagesToExport,
        module,
        selectedSectionDataStore,
        withSocioEconomics = false,
        sectionType,
        empty = false,
        orgUnitName,
        setProgress = () => { },
        onError
    } = props
    const { getData } = getCommonSheetData({ ...props, onError })
    const { getEvents } = useGetEvents()
    const { excelGenerator } = generateFile({ unavailableDays: isSchoolDay as unknown as (date: Date) => boolean, setProgress })
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

    async function exportData({ numberOfEmptyRows, startDate, endDate }: { startDate?: any, endDate?: any, numberOfEmptyRows?: number }) {

        if (!valid) {
            onError(`Export error: ${msg}`)
        } else {

            if (empty && module != modules.enrollment) {
                onError('Export error: The empty variable only applies to the enrollment module!')
            } else {
                setProgress((prev: any) => ({ ...prev, progress: 1, buffer: 10 }))
                let data: any = []
                const { filters, formatedHeaders, toGenerate, defaultLockedHeaders } = getHeaders(startDate, endDate)
                const metadata = getMetaData(programConfig, stagesToExport)

                if (!empty) data = await getData()

                if (module != modules.enrollment) {
                    for (let teisCounter = 0; teisCounter < data.length; teisCounter++) {
                        for (let a = 0; a < stagesToExport.length; a++) {
                            await getEvents({
                                program: selectedSectionDataStore?.program as unknown as string,
                                ...(module === modules.attendance ? {
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

                                data[teisCounter] = {
                                    ...data[teisCounter], ...formatSheetData({
                                        module: module,
                                        stageId: stagesToExport[a],
                                        events: events,
                                        dataStore: selectedSectionDataStore as unknown as DataStoreRecord
                                    })
                                }

                                setProgress((progress: any) => ({
                                    ...progress,
                                    progress: progress.progress + (40 / data.length * stagesToExport.length),
                                    buffer: progress.buffer + (41 / data.length * stagesToExport.length)
                                }))
                            }).catch((error) => {
                                setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                                onError(`Export error: Occurred error wihile fetching data: ${error}`)
                            })
                        }
                    }
                } else if (empty && module == modules.enrollment) {
                    let ids: any = {}

                    // for (const idToGenerate of toGenerate) {
                    //     await generate(numberOfEmptyRows, idToGenerate).then((generatedIds: any) => {
                    //         ids[idToGenerate] = generatedIds?.result?.map((x: any) => x.value)
                    //     }).catch((error) => {
                    //         onError(`Export error: ${error}`)
                    //         setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                    //     })
                    // }

                    data = generateEmptyRows(numberOfEmptyRows, formatedHeaders, ids, orgUnitName)
                }

                try {
                    await excelGenerator({ headers: formatedHeaders, rows: data, filters, fileName, metadata, module, empty, defaultLockedHeaders })
                } catch (error) {
                    setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                    onError(`Export error: Occurred an error while generating file!`)
                }
            }
        }
    }

    return { exportData }
}