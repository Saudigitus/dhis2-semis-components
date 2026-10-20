// The attendance option mapped as absence (configKey "absentCode") can carry the reason of absence in
// the same cell of the bulk file ("absent | SICK"); every other attendance option is saved as it is.
// The same separator is used by dhis2-semis-customfunc (check of the uploaded file).
export const REASON_SEPARATOR = " | "

const text = (value: any) => value === undefined || value === null ? "" : String(value).trim()

// Code of the attendance option mapped as absence in the configuration.
export function absentCode(attendance: any): string | undefined {
    return (attendance?.statusOptions ?? []).find((option: any) => option?.configKey === "absentCode")?.code
}

// Codes of the reasons of absence (option set of the reason data element in the attendance stage).
export function reasonCodes(programStage: any, reasonDataElement?: string): string[] {
    const element = (programStage?.programStageDataElements ?? []).find((x: any) => x?.dataElement?.id === reasonDataElement)
    return (element?.dataElement?.optionSet?.options ?? []).map((option: any) => text(option?.value ?? option?.code)).filter(Boolean)
}

export function withReason(status: string, reason?: string): string {
    return text(reason) ? `${status}${REASON_SEPARATOR}${text(reason)}` : status
}

export function splitStatus(value: any): { status: string, reason?: string } {
    const [status, ...rest] = text(value).split(REASON_SEPARATOR)
    const reason = rest.join(REASON_SEPARATOR).trim()
    return reason ? { status: status.trim(), reason } : { status: status.trim() }
}
