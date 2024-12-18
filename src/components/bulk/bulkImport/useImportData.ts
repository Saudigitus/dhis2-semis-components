import { excelData, importData } from "../../../types/bulk/bulkOperations";
import { modules } from "../../../types/common/moduleTypes";
import { DataStoreRecord } from "../../../types/dataStore/DataStoreConfig";
import { generateAttendanceEventObjects, generateEnrollmentData, generateEventObjects } from "./createEvents/createEventsObject";
import { postAttendanceValues } from "./postEvents/postAttendance";
import { postEnrollmentData } from "./postEvents/postEnrollment";
import { postValues } from "./postEvents/postEvents";
import { useState } from 'react'

type CombinedTypes = importData & excelData

export function useImportData({ setProgress }: { setProgress: (rags: any) => void }) {
    const [stats, setStats] = useState<any>()
    const { postData } = postValues({ setStats, setProgress })
    const { postAttendance } = postAttendanceValues({ setStats, setProgress })
    const { postEnrollments } = postEnrollmentData({ setStats, setProgress })

    async function importData(props: CombinedTypes) {
        setProgress((prev: any) => ({ ...prev, progress: 1, buffer: 10 }))

        const { excelData, importMode, updating = false, programConfig, selectedSectionDataStore, orgUnit, sectionType } = props
        const studentsData = excelData.mapping
        const profile = sectionType.substring(0, 1).toUpperCase() + sectionType.substring(1, sectionType.length) + ' profile'
        const programStages = [
            ...(
                excelData.module != modules.enrollment ?
                    (selectedSectionDataStore as unknown as any)?.[excelData.module].programStage ?
                        [(selectedSectionDataStore as unknown as any)?.[excelData.module].programStage] :
                        (selectedSectionDataStore as unknown as any)?.[excelData.module].programStages.map((x: any) => x.programStage)
                    : []
            )
        ]

        const displayNames = programConfig.programStages.filter(x => programStages.includes(x.id)).map(x => x.displayName)

        switch (excelData.module) {
            case modules.attendance:
                const { attendanceEvents } = generateAttendanceEventObjects(displayNames, studentsData, selectedSectionDataStore as unknown as DataStoreRecord)
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

            case modules.enrollment:
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
                    selectedSectionDataStore as unknown as DataStoreRecord,
                    orgUnit as unknown as string
                )
                break

            default:
                const { events } = generateEventObjects(displayNames, studentsData, programConfig)
                setProgress((prev: any) => ({ ...prev, progress: 20, buffer: 25 }))

                await postData(events, excelData, importMode, programConfig, programStages)
                break;
        }
    }

    return { importData, stats }
}