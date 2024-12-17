import { ExportData } from "../../../types/bulk/bulkOperations";
import { formatSheetData } from "../../../utils/format/formatSheetData";
import { DataStoreRecord } from "../../../types/dataStore/DataStoreConfig";
import { getMetaData } from '../../../utils/excelMetadata/getMetadata';
import { generateHeaders } from './excelHeaders/generateExcelHeaders';
import { getCommonSheetData } from './useGetCommonData/commonData';
import { generateFile } from './dataExporter/fileGenerator';
import { modules } from '../../../types/common/moduleTypes';
import { generateEmptyRows } from '../../../utils/common/generateData';
import { generateAndReserveIds } from './generateIds/generateAndReserve';
import { areParamsValid } from '../../../utils/common/validateRequiredParams';
import { useGetEvents } from "../../../hooks/events/useGetEvents";
import useShowAlerts from "../../../hooks/common/useShowAlert";

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
        setProgress = () => { }
    } = props
    const { hide, show } = useShowAlerts()
    const { getData } = getCommonSheetData({ ...props, setProgress })
    const { getEvents } = useGetEvents()
    const { generate } = generateAndReserveIds()
    const { excelGenerator } = generateFile({ unavailableDays: isSchoolDay as unknown as (date: Date) => boolean })
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
            show({ message: `Export error: ${msg}`, type: { critical: true } })
            setTimeout(hide, 5000);
        } else {

            if (empty && module != modules.enrollment) {
                show({ message: `Export error: The empty variable only applies to the enrollment module!`, type: { critical: true } })
                setTimeout(hide, 5000);
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
                                show({ message: `Export error: Occurred error wihile fetching data: ${error}`, type: { critical: true } })
                                setTimeout(hide, 5000);
                            })
                        }
                    }
                } else if (empty && module == modules.enrollment) {
                    let ids: any = {}

                    for (const idToGenerate of toGenerate) {
                        const generatedIds = await generate(numberOfEmptyRows, idToGenerate) as unknown as any
                        ids[idToGenerate] = generatedIds?.result?.map((x: any) => x.value)
                    }

                    data = generateEmptyRows(numberOfEmptyRows, formatedHeaders, ids, orgUnitName)
                }

                try {
                    await excelGenerator({ headers: formatedHeaders, rows: data, filters, fileName, metadata, module, empty, defaultLockedHeaders })
                    setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                } catch (error) {
                    show({ message: `Export error: Occurred an error while generating file!`, type: { critical: true } })
                    setTimeout(hide, 5000);
                }
            }
        }
    }

    return { exportData }
}