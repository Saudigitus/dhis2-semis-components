// Attendance and Performance files show only what the list shows on screen (rule of the bulk
// review): the person fields marked "Display in list" and the registration fields marked "Display
// in reports" in the program. Enrollment files keep all the fields; Final result is not changed yet.
export const showsListColumnsOnly = (module: string) => ["attendance", "performance"].includes(module)

export const listAttributes = (programAttributes: any[] = []) => programAttributes.filter((x: any) => x?.displayInList)

export const reportDataElements = (stageDataElements: any[] = []) => stageDataElements.filter((x: any) => x?.displayInReports)
