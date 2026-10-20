// Title and message of the import summary, from the same facts, so that they never disagree
// (before: the title counted the invalid rows of the file at every step and said "Errors were found!"
// after a clean dry run or a successful import).
// - check of the file: errors when rows of the file are invalid;
// - dry run: errors only when the server refused something;
// - import: errors only when the server refused something; the invalid rows left out are mentioned.
export function summaryNotice({ validated, committed, dryRunFailed, invalidRows, ignored, exceptions }: {
    validated: boolean, committed: boolean, dryRunFailed: boolean, invalidRows: number, ignored: number, exceptions: number
}): { hasErrors: boolean, message: string } {
    if (committed) {
        if (ignored + exceptions > 0) return { hasErrors: true, message: "Occurred errors during the import process, please review your file!" }
        return {
            hasErrors: false,
            message: invalidRows > 0 ? "Data imported successfully! The invalid records of the file were not imported." : "Data imported successfully!",
        }
    }
    if (validated) {
        if (dryRunFailed) return { hasErrors: true, message: "Errors were found during the dry run. Correct the file and upload it again." }
        return {
            hasErrors: false,
            message: invalidRows > 0
                ? "No errors were found during the dry run. The invalid records of the file will not be imported."
                : "No errors were found during dry run process, you can proceed with the import.",
        }
    }
    if (invalidRows > 0 || exceptions > 0) return { hasErrors: true, message: "Invalid records were found, please review your file! Only the valid records will be sent." }
    return { hasErrors: false, message: "No errors were found during file validation process, you can proceed with the dry run/import." }
}
