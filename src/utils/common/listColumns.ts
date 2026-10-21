// Attendance, Performance and Final result files show only what the list shows on screen (rule of
// the bulk review): the person fields marked "Display in list" and the registration fields marked
// "Display in reports" in the program. Enrollment files keep all the fields.
export const showsListColumnsOnly = (module: string) => ["attendance", "performance", "final-result"].includes(module)

export const listAttributes = (programAttributes: any[] = []) => programAttributes.filter((x: any) => x?.displayInList)

export const reportDataElements = (stageDataElements: any[] = []) => stageDataElements.filter((x: any) => x?.displayInReports)
