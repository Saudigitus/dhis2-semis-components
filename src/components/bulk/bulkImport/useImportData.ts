import { excelData, importData } from "../../../types/bulk/bulkOperations";
import { selectedDataStoreKey, Modules } from 'dhis2-semis-types';
import { generateAttendanceEventObjects, generateEnrollmentData, generateEventObjects, generateFinalResultData } from "./createEvents/createEventsObject";
import { dataValuesOfStage } from "../../../utils/common/stageDataValues";
import { classRecordStatusByDay } from "../../../utils/common/classRecord";
import { postClassRecordValues } from "./postEvents/postClassRecords";
import { postAttendanceValues } from "./postEvents/postAttendance";
import { postEnrollmentData } from "./postEvents/postEnrollment";
import { postValues } from "./postEvents/postEvents";
import { useUrlParams, useGetRegitration } from "dhis2-semis-functions";
import { useSchoolCalendarKey } from "../../../hooks/dataStore/useSchoolCalendarKey";
import { mergeImportStats } from "../../../utils/common/getImportSummary";

type CombinedTypes = importData & excelData & { importMode: "VALIDATE" | "COMMIT" };

export function useImportData({ setProgress, onError, setStats, stats, setOpenProgress, }: { setOpenProgress: (args: boolean) => void, stats: any, setStats: (args: any) => void, setProgress: (rags: any) => void, onError: (rags: any) => void }) {
    const { postData } = postValues({ setProgress, onError, setOpenProgress })
    const { postAttendance } = postAttendanceValues({ setProgress, onError, setOpenProgress })
    const { postClassRecords } = postClassRecordValues()
    const { postEnrollments } = postEnrollmentData({ setProgress, onError, setOpenProgress })
    const { urlParameters } = useUrlParams()
    const { school: orgUnit, academicYear } = urlParameters
    const { schoolCalendar } = useSchoolCalendarKey()
    const { useGetRegitrationDataElements } = useGetRegitration()

    async function importData(props: CombinedTypes) {
        // The stats of this run are also returned, so that "Import data" can check its dry run.
        let runStats: any
        const showStats = (value: any) => { runStats = value; setStats(value) }
        setProgress((prev: any) => ({ ...prev, progress: 1, buffer: 10 }))
        const { onError, excelData, importMode, updating = false, programConfig, selectedSectionDataStore, sectionType } = props

        const closeDialog = () => {
            setProgress({ prorocess: "import", progress: 0, buffer: 0 })
            setOpenProgress(false)
        }

        try {
            const studentsData = excelData.mapping
            const profile = sectionType?.substring(0, 1)?.toUpperCase() + sectionType?.substring(1, sectionType?.length) + ' profile'
            const programStages = [
                ...(
                    excelData?.module != Modules?.Enrollment ?
                        (selectedSectionDataStore as unknown as any)?.[excelData?.module].programStage ?
                            [(selectedSectionDataStore as unknown as any)?.[excelData?.module].programStage] :
                            (selectedSectionDataStore as unknown as any)?.[excelData?.module].programStages.map((x: any) => x.programStage)
                        : []
                )
            ]

            const displayNames = programConfig?.programStages.filter(x => programStages.includes(x.id)).map(x => x.displayName)

            switch (excelData?.module) {
                case Modules.Attendance:
                    const selectedSchoolCalendar = schoolCalendar?.find(x => x.academicYear?.code === academicYear)
                    // Class values of the screen, only those the attendance stage has (staff stages may not).
                    const attendanceStage = programConfig?.programStages.find(x => x.id === selectedSectionDataStore?.attendance?.programStage)
                    const rDataElements = dataValuesOfStage(useGetRegitrationDataElements(), attendanceStage)

                    // The row "Class record status" is not a person: it gives the class record of each day.
                    const personRows = studentsData.filter((x: any) => !x?.classRecord)
                    const statusByDay = classRecordStatusByDay(studentsData.find((x: any) => x?.classRecord))

                    const { attendanceEvents } = generateAttendanceEventObjects(displayNames, personRows, selectedSectionDataStore as unknown as selectedDataStoreKey, selectedSchoolCalendar, rDataElements)
                    const attendanceDisplayName = programConfig?.programStages.find(x => x.id === selectedSectionDataStore?.attendance?.programStage)?.displayName
                    setProgress((prev: any) => ({ ...prev, progress: 20, buffer: 25 }))

                    const attendanceStats = await postAttendance(
                        attendanceEvents,
                        attendanceDisplayName as unknown as string,
                        selectedSectionDataStore,
                        personRows,
                        programConfig?.id,
                        importMode,
                        Object.keys(statusByDay)
                    )
                    showStats(await postClassRecords({
                        statusByDay,
                        rows: personRows,
                        section: attendanceDisplayName as unknown as string,
                        dataStore: selectedSectionDataStore,
                        orgUnit: orgUnit as unknown as string,
                        classValues: useGetRegitrationDataElements(),
                        importMode,
                        stats: attendanceStats,
                    }).finally(() => closeDialog()))
                    break;

                case Modules.Enrollment:
                    /**
                     * Ao se registar um novo estudante criam-se eventos de todos os program stages, excepto attendance e transfer e 
                     * ao se actualizar o estudante nao se cria nenhum evento, sendo assim, esse array terá uma lista de todos os 
                     * program stages que devem ser ignorados na hora de actualizar e/ou registar um novo estudante
                     */
                    const stagesToIgnore = [
                        selectedSectionDataStore?.attendance?.programStage as unknown as string,
                        selectedSectionDataStore?.transfer?.programStage as unknown as string,
                        // The update also sends the registration record (grade, class...): SEMIS-213.
                        ...(updating ? [
                            selectedSectionDataStore?.["final-result"]?.programStage as unknown as string,
                            ...(selectedSectionDataStore?.performance?.programStages?.map(x => x.programStage) || [])
                        ] : [""])
                    ]

                    const { enrollments } = generateEnrollmentData(
                        profile,
                        programConfig,
                        stagesToIgnore,
                        studentsData,
                        orgUnit as unknown as string,
                        updating,
                        selectedSectionDataStore
                    )
                    setProgress((prev: any) => ({ ...prev, progress: 20, buffer: 25 }))

                    showStats(await postEnrollments(
                        enrollments,
                        studentsData,
                        importMode,
                        programConfig?.id,
                        updating,
                        selectedSectionDataStore as unknown as selectedDataStoreKey,
                        orgUnit as unknown as string
                    ).finally(() => closeDialog()))

                    break

                case Modules.Final_Result: {
                    const { events } = generateEventObjects(displayNames, studentsData, programConfig)
                    const { enrollmentUpdates } = generateFinalResultData(
                        displayNames,
                        studentsData,
                        programConfig,
                        selectedSectionDataStore
                    )

                    setProgress((prev: any) => ({ ...prev, progress: 20, buffer: 25 }))

                    const eventStats = await postData(events, excelData, importMode, programConfig, programStages).finally(() => closeDialog())

                    const enrollmentStats = await postEnrollments(
                        enrollmentUpdates,
                        studentsData,
                        importMode,
                        programConfig?.id,
                        true,
                        selectedSectionDataStore as unknown as selectedDataStoreKey,
                        orgUnit as unknown as string,
                        true
                    ).finally(() => closeDialog())

                    // Final result sends events and enrollments: show the stats of both.
                    showStats(mergeImportStats(eventStats, enrollmentStats))
                }
                    break;

                default:
                    const { events } = generateEventObjects(displayNames, studentsData, programConfig)
                    setProgress((prev: any) => ({ ...prev, progress: 20, buffer: 25 }))

                    showStats(await postData(events, excelData, importMode, programConfig, programStages).finally(() => closeDialog()))
                    break;
            }
        } catch (error) {
            setOpenProgress(false)
            showStats({ stats: { ignored: 0, created: 0, updated: 0, total: 0 }, errorDetails: [], exceptions: [{ "Error message": error?.message || error || 'Unkknown error' }], byType: [] })
            onError(error)
        }
        return runStats
    }

    return { importData, stats }
}