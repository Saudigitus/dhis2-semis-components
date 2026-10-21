import { splitStatus } from "./absenceReason";

// Row "Class record status" of the attendance files: the status of the class attendance record of
// each day, as "Take attendance" on screen (ACTIVE = in progress, COMPLETED = completed). The export
// writes it under the dates; the import creates or updates the class record of each day. The same
// text is used by dhis2-semis-customfunc (check of the uploaded file).
export const CLASS_RECORD_ROW = "Class record status"
export const CLASS_RECORD_STATUSES = ["ACTIVE", "COMPLETED"]
const NON_SCHOOL_DAY = "Non School Day"

type DataValue = { dataElement: string, value: any }
type ClassRecord = { event?: string, occurredAt?: string, status?: string, dataValues?: DataValue[] }

const text = (value: any) => value === undefined || value === null ? "" : String(value).trim()
const dayOf = (value: any) => text(value).slice(0, 10)
// The option of a cell, without the reason of absence ("absent | SICK" -> "absent").
const statusOf = (value: any) => splitStatus(value).status

// Export: the row written under the dates, from the class records of the period.
export function classRecordExportRow(records: ClassRecord[] = []): Record<string, string> {
    const row: Record<string, string> = { ref: CLASS_RECORD_ROW }
    for (const record of records)
        if (CLASS_RECORD_STATUSES.includes(text(record?.status))) row[dayOf(record.occurredAt)] = text(record.status)
    return row
}

// Import: the status written for each day in the row of the file (empty days are left out).
export function classRecordStatusByDay(row: any): Record<string, string> {
    const statuses: Record<string, string> = {}
    for (const [day, value] of Object.entries(row?.Attendance ?? {})) {
        const status = text(value).toUpperCase()
        if (CLASS_RECORD_STATUSES.includes(status)) statuses[day] = status
    }
    return statuses
}

// Days on which at least one person of the file has one of the given attendance options (e.g.
// "absent"); "present", empty cells and non-school days are not counted.
export function daysWithValues(rows: any[] = [], section: string = "Attendance", options?: string[]): string[] {
    const days = new Set<string>()
    for (const row of rows)
        for (const [day, value] of Object.entries(row?.[section] ?? {}))
            if (text(value) !== "" && text(value) !== NON_SCHOOL_DAY && (!options || options.includes(statusOf(value)))) days.add(day)
    return [...days].sort()
}

// The class record of each day (rule agreed on 2026-10-20), always with the totals counted again:
// - COMPLETED in the file: created or updated;
// - ACTIVE, or no status, with at least one attendance value (e.g. an absence): created or updated
//   as ACTIVE (no status: "emptyStatus", reported as a warning);
// - ACTIVE without values: only when the class record of the server is not ACTIVE (day reopened);
// - otherwise the class record of the day is not changed.
export function planClassRecords(statusByDay: Record<string, string>, valueDays: string[], existingByDay: Record<string, ClassRecord>) {
    const days = [...new Set([...Object.keys(statusByDay), ...valueDays])].sort()
    const plan: { day: string, status: string, event?: string, emptyStatus: boolean }[] = []
    for (const day of days) {
        const existing = existingByDay[day]
        const status = statusByDay[day]
        if (status === "COMPLETED" || valueDays.includes(day))
            plan.push({ day, status: status ?? "ACTIVE", event: existing?.event, emptyStatus: !status })
        else if (status === "ACTIVE" && existing && text(existing.status) !== "ACTIVE")
            plan.push({ day, status, event: existing.event, emptyStatus: false })
    }
    return plan
}

// The class record of a day, with the values of the screen and the totals of the file.
export function classRecordEvent(
    plan: { day: string, status: string, event?: string },
    config: { program: string, programStage: string, orgUnit: string, classValues: DataValue[], totalRecords?: string, summaries: { code: string, dataElement: string }[] },
    totals: { totalRecords: number, byStatus: Record<string, number> }
) {
    return {
        ...(plan.event ? { event: plan.event } : {}),
        program: config.program,
        programStage: config.programStage,
        orgUnit: config.orgUnit,
        occurredAt: plan.day,
        status: plan.status,
        dataValues: [
            ...config.summaries.map(({ code, dataElement }) => ({ dataElement, value: totals?.byStatus?.[code] ?? 0 })),
            ...(config.totalRecords ? [{ dataElement: config.totalRecords, value: totals?.totalRecords ?? 0 }] : []),
            ...config.classValues,
        ],
    }
}

// True when the class record of the server already has this status and these values.
export function sameClassRecord(existing: ClassRecord | undefined, event: { status: string, dataValues: DataValue[] }): boolean {
    if (!existing || text(existing.status) !== event.status) return false
    const saved = new Map((existing.dataValues ?? []).map(x => [x.dataElement, text(x.value)]))
    return event.dataValues.every(x => text(x.value) === (saved.get(x.dataElement) ?? ""))
}
