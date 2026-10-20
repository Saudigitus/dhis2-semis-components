// Numbers of the summary of an attendance file. Values to record: the filled cells of the valid
// rows ("Non School Day" and empty cells record nothing). Invalid values: one per reason given
// for the invalid rows (a cell that is not an attendance option, a missing field...).
const NON_SCHOOL_DAY = "Non School Day"

const hasValue = (value: any) => value !== undefined && value !== null && String(value).trim() !== "" && String(value).trim() !== NON_SCHOOL_DAY

export function attendanceValuesToRecord(validRows: any[] = []): number {
    return validRows.reduce((total, row) => total + Object.values(row?.Attendance ?? {}).filter(hasValue).length, 0)
}

export function attendanceInvalidValues(invalidRows: any[] = []): number {
    return invalidRows.reduce((total, row) => total + (row?.errors?.length ?? 0), 0)
}
