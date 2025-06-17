import { excelData, importData } from "../../../types/bulk/bulkOperations";
import { selectedDataStoreKey, Modules } from 'dhis2-semis-types';
import { generateAttendanceEventObjects, generateEnrollmentData, generateEventObjects } from "./createEvents/createEventsObject";
import { postAttendanceValues } from "./postEvents/postAttendance";
import { postEnrollmentData } from "./postEvents/postEnrollment";
import { postValues } from "./postEvents/postEvents";
import { useUrlParams } from "dhis2-semis-functions";

type CombinedTypes = importData & excelData & { importMode: "VALIDATE" | "COMMIT" };

export function useImportData({ setProgress, onError, setStats, stats, setOpen }: { setOpen: (args: boolean) => void, stats: any, setStats: (args: any) => void, setProgress: (rags: any) => void, onError: (rags: any) => void }) {
    const { postData } = postValues({ setStats, setProgress, onError, setOpen })
    const { postAttendance } = postAttendanceValues({ setStats, setProgress, onError, setOpen })
    const { postEnrollments } = postEnrollmentData({ setStats, setProgress, onError, setOpen })
    const { urlParameters } = useUrlParams()
    const { school: orgUnit } = urlParameters()

    async function importData(props: CombinedTypes) {
        setProgress((prev: any) => ({ ...prev, progress: 1, buffer: 10 }))
        const { onError, excelData, importMode, updating = false, programConfig, selectedSectionDataStore, sectionType } = props

        try {
            const studentsData = excelData.mapping
            const profile = sectionType.substring(0, 1).toUpperCase() + sectionType.substring(1, sectionType.length) + ' profile'
            const programStages = [
                ...(
                    excelData.module != Modules.Enrollment ?
                        (selectedSectionDataStore as unknown as any)?.[excelData.module].programStage ?
                            [(selectedSectionDataStore as unknown as any)?.[excelData.module].programStage] :
                            (selectedSectionDataStore as unknown as any)?.[excelData.module].programStages.map((x: any) => x.programStage)
                        : []
                )
            ]

            const displayNames = programConfig.programStages.filter(x => programStages.includes(x.id)).map(x => x.displayName)

            switch (excelData.module) {
                case Modules.Attendance:
                    const { attendanceEvents } = generateAttendanceEventObjects(displayNames, studentsData, selectedSectionDataStore as unknown as selectedDataStoreKey)
                    const attendanceDisplayName = programConfig.programStages.find(x => x.id === selectedSectionDataStore?.attendance.programStage)?.displayName
                    setProgress((prev: any) => ({ ...prev, progress: 20, buffer: 25 }))

                    await postAttendance(
                        attendanceEvents,
                        attendanceDisplayName as unknown as string,
                        selectedSectionDataStore?.attendance.programStage as unknown as string,
                        excelData.mapping,
                        programConfig.id,
                        importMode
                    )
                    break;

                case Modules.Enrollment:
                    /**
                     * Ao se registar um novo estudante criam-se eventos de todos os program stages, excepto attendance e transfer e 
                     * ao se actualizar o estudante nao se cria nenhum evento, sendo assim, esse array terá uma lista de todos os 
                     * program stages que devem ser ignorados na hora de actualizar e/ou registar um novo estudante
                     */
                    const stagesToIgnore = [
                        selectedSectionDataStore?.attendance.programStage as unknown as string,
                        selectedSectionDataStore?.transfer.programStage as unknown as string,
                        ...(updating ? [
                            selectedSectionDataStore?.["final-result"].programStage as unknown as string,
                            selectedSectionDataStore?.registration.programStage as unknown as string,
                            ...(selectedSectionDataStore?.performance.programStages?.map(x => x.programStage))
                        ] : [""])
                    ]

                    const { enrollments } = generateEnrollmentData(
                        profile,
                        programConfig,
                        stagesToIgnore,
                        studentsData,
                        orgUnit as unknown as string,
                        updating,
                    )
                    setProgress((prev: any) => ({ ...prev, progress: 20, buffer: 25 }))

                    await postEnrollments(
                        enrollments,
                        studentsData,
                        importMode,
                        programConfig.id,
                        updating,
                        selectedSectionDataStore as unknown as selectedDataStoreKey,
                        orgUnit as unknown as string
                    )
                    break

                default:
                    const { events } = generateEventObjects(displayNames, studentsData, programConfig)
                    setProgress((prev: any) => ({ ...prev, progress: 20, buffer: 25 }))

                    await postData(events, excelData, importMode, programConfig, programStages)
                    break;
            }
        } catch (error) {
            setOpen(false)
            onError('Import Error: ' + error)
        }
    }

    return { importData, stats }
}