// Only the values of data elements that belong to the program stage can be sent with its records
// (the server refuses the others). Used for the class values (academic year, grade, class / type of
// staff, employment type) added to the attendance records.
export function dataValuesOfStage(dataValues: { dataElement: string, value: any }[] = [], programStage: any): { dataElement: string, value: any }[] {
    const ids = new Set((programStage?.programStageDataElements ?? []).map((x: any) => x?.dataElement?.id))
    return dataValues.filter((x) => ids.has(x?.dataElement))
}
