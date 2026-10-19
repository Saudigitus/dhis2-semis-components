import { importStrategy } from "../../../../types/bulk/bulkOperations";
import { selectedDataStoreKey } from 'dhis2-semis-types';
import { splitArrayIntoChunks } from "../../../../utils/common/splitArray";
import { importSummary } from "../../../../utils/common/getImportSummary";
import { useUploadEvents } from "dhis2-semis-functions";
import { useGetEvents } from "dhis2-semis-functions";
import { TranslationState } from "../../../..//schemas/translationsSchema";
import { useRecoilValue } from "recoil";
import { useDataEngine } from "@dhis2/app-runtime";
import { groupByEnrollment, readEventsByEnrollments, chunkList } from "../../../../utils/common/eventsByEnrollment";
import { buildEnrollmentUpdate } from "../../../../utils/common/enrollmentUpdate";

export function postEnrollmentData({ setProgress, onError, setOpenProgress }: { setOpenProgress: (args: boolean) => void, setProgress: (rags: any) => void, onError: (args: string) => void }) {
    const { getEvents } = useGetEvents()
    const { uploadValues } = useUploadEvents()
    const i18n = useRecoilValue(TranslationState) as any
    const engine = useDataEngine()

    // Enrollments by id (dates, school and status as saved on the server), read in groups.
    async function readEnrollments(enrollmentIds: string[]): Promise<Record<string, any>> {
        const found: Record<string, any> = {}
        for (const group of chunkList([...new Set(enrollmentIds.filter(Boolean))])) {
            const response: any = await engine.query({
                results: {
                    resource: "tracker/enrollments",
                    params: { enrollments: group.join(","), fields: "enrollment,enrolledAt,occurredAt,orgUnit,status", pageSize: group.length }
                }
            })
            for (const enrollment of (response?.results?.enrollments ?? response?.results?.instances ?? [])) found[enrollment.enrollment] = enrollment
        }
        return found
    }

    function updateProgressF(buffer: number, progressParam: number, denominador: number) {
        setProgress((progress: any) => ({
            ...progress,
            progress: progress.progress + (progressParam / denominador),
            buffer: progress.buffer + (buffer / denominador)
        }))
    }

    async function postEnrollments(
        enrollments: any[], excelData: any, importMode: "VALIDATE" | "COMMIT", program: string,
        updating: boolean, dataStore: selectedDataStoreKey, orgUnit: string, updatingFR = false
    ) {
        let copyData = [...enrollments]
        let updatedStats: any = { stats: { ignored: 0, created: 0, updated: 0, total: 0 }, errorDetails: [], warningDetails: [], exceptions: [], byType: [] }
        const updateProgress = (updating || updatingFR) ? 40 : 0

        if (updating && !updatingFR) {
            // Update of existing enrollments: the registration and socio-economics / Teacher Detail
            // records of all the rows are read once (in groups) and each row keeps on the server
            // what was not changed (dates, school, status) - see buildEnrollmentUpdate.
            const ids = excelData.map((x: any) => ({ trackedEntity: x?.Ids?.trackedEntity, orgUnit: x?.Ids?.orgUnit, enrollment: x?.Ids?.enrollment }))
            const registrationStage = dataStore?.registration?.programStage as unknown as string
            const stages = [registrationStage, dataStore?.["socio-economics"]?.programStage].filter(Boolean) as string[]

            try {
                const events: any[] = []
                for (const programStage of stages)
                    events.push(...await readEventsByEnrollments(getEvents, {
                        program,
                        programStage,
                        orgUnitMode: "ACCESSIBLE",
                        fields: "event,enrollment,programStage,orgUnit,occurredAt,status"
                    }, ids.map((x: any) => x.enrollment)))
                const eventsByEnrollment = groupByEnrollment(events)
                const enrollmentsById = await readEnrollments(ids.map((x: any) => x.enrollment))

                copyData = copyData.map((row: any, index: number) => buildEnrollmentUpdate(
                    row,
                    { enrollment: enrollmentsById[ids[index].enrollment], events: eventsByEnrollment[ids[index].enrollment] ?? [] },
                    registrationStage,
                    ids[index],
                    dataStore.trackedEntityType as unknown as string
                ))
                updateProgressF(updateProgress + 5, updateProgress, 1)
            } catch (error: any) {
                setOpenProgress(false)
                onError(error)
                return { ...updatedStats, exceptions: [{ [i18n.t("Error message")]: error?.message ?? String(error) }] }
            }
        } else if (updatingFR) {
            copyData = copyData.map(({ attributes, ...rest }: any) => ({ ...rest, events: [] }))
            updateProgressF(updateProgress + 5, updateProgress, 1)
        } else {
            for (let index = 0; index < copyData.length; index++) {
                const { ...props } = copyData[index]

                copyData[index] = {
                    trackedEntityType: dataStore.trackedEntityType,
                    orgUnit: orgUnit,
                    enrollments: [{
                        ...props,
                    }]
                }
            }
        }

        const chunks = splitArrayIntoChunks(copyData, 50);

        for (const chunk of chunks) {
            await uploadValues((updatingFR ? { enrollments: chunk } : { trackedEntities: chunk }), importMode, importStrategy.CREATE).then((response: any) => {
                updatedStats = importSummary(response, updatedStats)
                updateProgressF((90 + 5 - updateProgress), (90 - updateProgress), chunks.length)
            }).catch((error: any) => {
                updatedStats = { ...updatedStats, exceptions: [{ [i18n.t("Error message")]: error?.message }] }
                setOpenProgress(false);
                onError(error);
            });
        }

        return updatedStats
    }

    return { postEnrollments }
}