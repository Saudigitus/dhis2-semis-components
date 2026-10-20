// Label of the enrollment date column of the bulk files: the label configured on the program in
// DHIS2 (e.g. "Registration date", "Date of employment"; already translated by the server), or
// "Enrollment date" when the program has none.
export function enrollmentDateLabel(program: any, translate: (key: string) => string): string {
    const label = String(program?.displayEnrollmentDateLabel ?? "").trim()
    return label || translate("Enrollment date")
}
