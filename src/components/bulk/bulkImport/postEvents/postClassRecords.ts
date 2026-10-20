import { useGetEvents, useUploadEvents } from "dhis2-semis-functions";
import { format } from "date-fns";
import { importSummary } from "../../../../utils/common/getImportSummary";
import { classRecordEvent, daysWithValues, planClassRecords, sameClassRecord } from "../../../../utils/common/classRecord";
import { splitStatus } from "../../../../utils/common/absenceReason";

// Class attendance records of the days of an attendance file ("Class record status" row), saved after
// the attendance of the persons, with the values of "Take attendance" on screen. The totals are counted
// again from the file at every import and always saved (also on ACTIVE days): its rows are the class
// and, after the import, the file is what is saved for them. See planClassRecords for the days.
export function postClassRecordValues() {
    const { getEvents } = useGetEvents()
    const { uploadValues } = useUploadEvents()

    async function postClassRecords({ statusByDay, rows, personsInFile, section, dataStore, orgUnit, classValues, importMode, stats }: {
        statusByDay: Record<string, string>, rows: any[], personsInFile?: number, section: string, dataStore: any, orgUnit: string,
        classValues: { dataElement: string, value: any }[], importMode: "VALIDATE" | "COMMIT", stats: any
    }) {
        const attendanceStatus = dataStore?.attendance?.attendanceStatus
        if (!attendanceStatus?.allowAttendanceStatus || !attendanceStatus?.program || !attendanceStatus?.programStage) return stats

        const optionCodes: string[] = (dataStore?.attendance?.statusOptions ?? []).map((option: any) => option?.code)
        const valueDays = daysWithValues(rows, section, optionCodes)
        const days = [...new Set([...Object.keys(statusByDay), ...valueDays])].sort()
        if (!days.length) return stats

        // Class records of the class (academic year + filters of the screen) in the period of the file.
        const lastDay = new Date(`${days[days.length - 1]}T00:00:00`)
        lastDay.setDate(lastDay.getDate() + 1)
        const existing: any[] = await getEvents({
            program: attendanceStatus.program,
            programStage: attendanceStatus.programStage,
            orgUnit,
            occurredAfter: days[0],
            occurredBefore: format(lastDay, "yyyy-MM-dd"),
            filter: classValues.filter(x => x?.dataElement && x?.value).map(x => `${x.dataElement}:in:${x.value}`),
            fields: "event,occurredAt,status,dataValues[dataElement,value]",
            pageSize: 1000,
        }) ?? []
        const existingByDay: Record<string, any> = {}
        for (const record of existing) existingByDay[String(record?.occurredAt).slice(0, 10)] ??= record

        const config = {
            program: attendanceStatus.program,
            programStage: attendanceStatus.programStage,
            orgUnit,
            classValues,
            totalRecords: attendanceStatus.totalRecords,
            summaries: (dataStore?.attendance?.statusOptions ?? [])
                .filter((option: any) => option?.totalSummary)
                .map((option: any) => ({ code: option.code, dataElement: option.totalSummary })),
        }
        const totalsOf = (day: string) => {
            const byStatus: Record<string, number> = {}
            for (const row of rows) {
                const value = splitStatus(row?.[section]?.[day]).status
                if (value && value !== "Non School Day") byStatus[value] = (byStatus[value] ?? 0) + 1
            }
            // Total: the persons of the whole file, also the rows not sent because they are invalid.
            return { totalRecords: Math.max(personsInFile ?? 0, rows.length), byStatus }
        }

        const plan = planClassRecords(statusByDay, valueDays, existingByDay)
        const events = plan
            .map(item => classRecordEvent(item, config, totalsOf(item.day)))
            .filter(event => !sameClassRecord(existingByDay[event.occurredAt], event))

        let updatedStats = {
            ...stats,
            warningDetails: [
                ...(stats?.warningDetails ?? []),
                ...plan.filter(item => item.emptyStatus).map(item => ({
                    uid: item.day, trackerType: "EVENT", warningCode: "CLASS_RECORD",
                    message: `${item.day}: the file has attendance values but no class record status; the class record of the day is saved as in progress (ACTIVE).`,
                })),
            ],
        }
        if (events.length)
            updatedStats = importSummary(await uploadValues({ events }, importMode, "CREATE_AND_UPDATE"), updatedStats)

        return updatedStats
    }

    return { postClassRecords }
}
