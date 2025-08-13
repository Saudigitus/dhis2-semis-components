import { schoolCalendar } from "../../../types/dataStore/schoolCalendar";

const getOptionsByDataElement = (dataElement: string, program: any) => {
    const options = [];
    if (dataElement && program) {
        program?.programStages?.forEach((stage: any) => {
            stage.programStageDataElements.forEach(element => {
                if (element.dataElement.id === dataElement && element.dataElement.optionSet) {
                    options.push(...element.dataElement.optionSet.options);
                }
            });
        });
    }
    return options
}

const getAcademicYearOptions = ({ schoolCalendar }: { schoolCalendar: schoolCalendar["schoolCalendar"] }) => {
    return schoolCalendar.map(calendar => ({
        label: calendar?.academicYear?.label,
        value: calendar?.academicYear?.code
    }));
}

export { getOptionsByDataElement, getAcademicYearOptions }