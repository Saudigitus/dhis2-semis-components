import { splitArrayIntoChunks } from "../../../../utils/common/splitArray";
import { importStrategy } from "../../../../types/bulk/bulkOperations";
import { importSummary } from "../../../../utils/common/getImportSummary";
import { eventsWithValues, withExistingEvent } from "../../../../utils/common/stageEvents";
import { ProgramConfig } from "dhis2-semis-types"
import { useUploadEvents } from "dhis2-semis-functions";
import { useGetEvents } from "dhis2-semis-functions";
import { useRecoilValue } from "recoil";
import { TranslationState } from "../../../../schemas/translationsSchema";

export function postValues({ setProgress, onError, setOpenProgress }: { setOpenProgress: (args: boolean) => void, setProgress: (rags: any) => void, onError: (args: string) => void }) {
    const { uploadValues } = useUploadEvents()
    const { getEvents } = useGetEvents()
    const i18n = useRecoilValue(TranslationState) as any

    function updateProgressF(buffer: number, progressParam: number, denominador: number) {
        setProgress((progress: any) => ({
            ...progress,
            progress: progress.progress + (progressParam / denominador),
            buffer: progress.buffer + (buffer / denominador)
        }))
    }

    async function postData(
        data: any[],
        excelData: any,
        importMode: "VALIDATE" | "COMMIT",
        programConfig: ProgramConfig,
        programStages: string[]
    ) {
        // Stats of this run only: a dry run and the import that follows must not add up.
        let updatedStats: any = { stats: { ignored: 0, created: 0, updated: 0, total: 0 }, errorDetails: [], warningDetails: [], exceptions: [], byType: [] }
        let copyData = [...data]
        for (const student of excelData.mapping as unknown as []) {
            const { enrollment, orgUnit, trackedEntity } = (student as unknown as any).Ids

            for (const stage of programStages) {
                let page = 1, pageSize = 50, events = []

                do {
                    events = await getEvents({
                        program: programConfig.id,
                        orgUnit,
                        orgUnitMode: "SELECTED",
                        programStage: stage,
                        fields: "event,programStage,trackedEntity,occurredAt,status,enrollment,dataValues[dataElement,value]",
                        trackedEntities: trackedEntity,
                        page,
                        pageSize
                    }).then((resp: any) => {
                        // The existing record keeps its id, its date and its status.
                        const existing = resp.find((x: any) => x.enrollment === enrollment && x.programStage == stage)
                        const index = copyData.findIndex(x => x.enrollment === enrollment && x.programStage == stage)
                        if (index >= 0) copyData[index] = withExistingEvent(copyData[index], existing)
                        page++
                        
                        return resp
                    }).catch((error) => {
                        setOpenProgress(false)
                        onError(error)
                    })
                } while (events?.length == pageSize)
                updateProgressF(20, 17, excelData.mapping.length * programStages.length)
            }
        }

        const chunks = splitArrayIntoChunks(eventsWithValues(copyData), 50);

        for (const chunk of chunks) {
            await uploadValues({ events: chunk }, importMode, importStrategy.CREATE).then((response) => {
                updatedStats = importSummary(response, updatedStats)
                updateProgressF(20, 13, chunks.length)
            }).catch((error) => {
                updatedStats = { ...updatedStats, exceptions: [{ [i18n.t("Error message")]: error?.message }] }
                setOpenProgress(false)
                onError(error)
            });
        }

        return updatedStats
    }

    return { postData }
}

