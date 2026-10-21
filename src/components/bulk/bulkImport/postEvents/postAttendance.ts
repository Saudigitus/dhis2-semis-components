import { format } from "date-fns"
import { importStrategy } from "../../../../types/bulk/bulkOperations"
import { importSummary } from "../../../../utils/common/getImportSummary"
import { splitArrayIntoChunks } from "../../../../utils/common/splitArray"
import { readEventsByEnrollments } from "../../../../utils/common/eventsByEnrollment"
import { useGetEvents } from "dhis2-semis-functions";
import { useUploadEvents } from "dhis2-semis-functions";
import { TranslationState } from "../../../../schemas/translationsSchema";
import { useRecoilValue } from "recoil";

export function postAttendanceValues({ setProgress, onError, setOpenProgress }: { setOpenProgress: (args: boolean) => void, setProgress: (rags: any) => void, onError: (args: string) => void }) {
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
    async function postAttendance(
        events: any[],
        programStageName: string,
        selectedSectionDataStore: any,
        excelData: any[],
        program: string,
        importMode: "VALIDATE" | "COMMIT",
        classRecordDays: string[] = []
    ) {
        // Stats of this run only: a dry run and the import that follows must not add up.
        let updatedStats: any = { stats: { ignored: 0, created: 0, updated: 0, total: 0 }, errorDetails: [], warningDetails: [], exceptions: [], byType: [] }
        let values: any = { CREATE: [], UPDATE: [], DELETE: [] }
        const keys = Object.keys(values)
        const programStageId = selectedSectionDataStore?.attendance?.programStage as unknown as string
        const statusOptions = selectedSectionDataStore?.attendance?.statusOptions?.map((x: any) => x.code)
        const allowAttendanceStatus = selectedSectionDataStore?.attendance?.attendanceStatus?.allowAttendanceStatus

        for (const student of excelData as unknown as []) {
            const { enrollment, orgUnit, trackedEntity } = (student as unknown as any).Ids
            const days = Object.keys(student[programStageName])
            const filter = {
                occurredAfter: days[0],
                occurredBefore: days[days.length - 1]
            }

            // Existing attendance records of the period, by day: every page is read (the paging
            // stops on the reply of the server, not on the file) before deciding create / update.
            const alreadyExistingEvents: any = {}
            try {
                const existing = await readEventsByEnrollments(getEvents, {
                    program,
                    ...filter,
                    orgUnit,
                    orgUnitMode: "SELECTED",
                    programStage: programStageId,
                    fields: "event,trackedEntity,occurredAt,enrollment,dataValues[dataElement,value]",
                    trackedEntities: trackedEntity,
                }, [enrollment], 1, 50)
                existing.filter(x => x.enrollment === enrollment).forEach((x) => {
                    alreadyExistingEvents[format(new Date(x.occurredAt), 'yyyy-MM-dd')] = x.event
                })
            } catch (error) {
                setOpenProgress(false)
                onError(error)
                return updatedStats
            }

            // On a day with a class record an empty cell means present: the absence saved before is
            // removed, as "Present" does on screen.
            if (allowAttendanceStatus)
                for (const day of classRecordDays) {
                    const cell = String((student as any)?.[programStageName]?.[day] ?? "").trim()
                    if (cell === "" && alreadyExistingEvents[day]) values.DELETE.push({ event: alreadyExistingEvents[day] })
                }

            events.filter(x => x.enrollment === enrollment).forEach(event => {
                const { status, ...rest } = event
                if (alreadyExistingEvents[event.occurredAt]) {
                    if (statusOptions.includes(status))
                        values.UPDATE.push({ ...rest, event: alreadyExistingEvents[event.occurredAt] });

                    else if (allowAttendanceStatus)
                        values.DELETE.push({ event: alreadyExistingEvents[event.occurredAt] });

                } else if (statusOptions.includes(status))
                    values.CREATE.push(rest);
            });

            updateProgressF(40, 35, excelData.length)
        }

        for (const key of keys) {
            const chunks = splitArrayIntoChunks(values[key], 50);

            for (const chunk of chunks) {
                if (chunk?.length > 0)
                    await uploadValues({ events: chunk }, importMode, (importStrategy as unknown as any)[key]).then((response) => {
                        updatedStats = importSummary(response, updatedStats)
                        updateProgressF(50, 50, keys.length * chunks.length)
                    }).catch((error: any) => {
                        updatedStats = { ...updatedStats, exceptions: [{ [i18n.t("Error message")]: error?.message }] }
                        setOpenProgress(false)
                        onError(error)
                    });
            }
        }

        return updatedStats
    }

    return { postAttendance }
}