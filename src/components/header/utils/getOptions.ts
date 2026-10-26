import { ProgramConfig } from "dhis2-semis-types/dist/declarations";
import { schoolCalendarDataStoreRecord } from "../../../types/dataStore/schoolCalendar";

const getOptionsByDataElement = (dataElement: string, program: any) => {
    const options = [];
    if (dataElement && program) {
        program?.programStages?.forEach((stage: any) => {
            if (!options!.length) {
                stage.programStageDataElements.forEach((element: { dataElement: { id: string, optionSet: { options: any } } }) => {
                    if (element.dataElement.id === dataElement && element.dataElement.optionSet) {
                        options.push(...element.dataElement.optionSet.options);
                    }
                })
            }
        });
    }
    return options
}

const getAcademicYearOptions = ({ schoolCalendar, program }: { schoolCalendar: schoolCalendarDataStoreRecord, program: ProgramConfig }) => {
    const options = [];

    if (!schoolCalendar?.academicYear || schoolCalendar?.schoolCalendar?.length === 0) {
        return [];
    }

    program?.programStages?.forEach((stage: any) => {
        if (!options!.length) {
            stage?.programStageDataElements.forEach(element => {
                if (element?.dataElement?.id === schoolCalendar?.academicYear) {
                    element?.dataElement?.optionSet?.options?.forEach(option => {
                        if (schoolCalendar?.schoolCalendar?.some((op) => op?.academicYear?.label == option?.label || op?.academicYear?.code == option?.value))
                            options.push(option)
                    })
                }
            });
        }
    });

    // chronological order: calendar start date, then the option code
    const startDateOf = (option: any) => String(schoolCalendar?.schoolCalendar?.find((op) => op?.academicYear?.code == option?.value || op?.academicYear?.label == option?.label)?.academicYear?.startDate ?? "")
    return options.sort((a: any, b: any) => startDateOf(a).localeCompare(startDateOf(b)) || String(a?.value ?? "").localeCompare(String(b?.value ?? ""), undefined, { numeric: true }))
}

export { getOptionsByDataElement, getAcademicYearOptions }