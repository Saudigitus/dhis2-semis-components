import { formatResponseEvents } from "./formatResponseEvents";
import { CustomAttributeProps, VariablesTypes, Attribute, ProgramConfig, ProgramStageConfig } from "dhis2-semis-types";
import { useDataStoreKey } from "../../hooks/dataStore/useDataStoreKey";
import { useGetSectionTypeLabel } from "dhis2-semis-functions";

export function useEnrollmentsHeader({ programConfig }: { programConfig: ProgramConfig }) {
    const { sectionName } = useGetSectionTypeLabel()
    const { registration } = useDataStoreKey({ sectionType: sectionName })
    const enrollmentDetailProgramStage = programConfig.programStages.find((element: ProgramStageConfig) => element.id === registration.programStage) as unknown as ProgramStageConfig

    const staticHeaders: CustomAttributeProps[] = [{
        id: "orgUnitName",
        displayName: "School",
        header: "School",
        required: false,
        name: "orgUnitName",
        labelName: "School",
        valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
        options: undefined as unknown as CustomAttributeProps["options"],
        visible: true,
        disabled: false,
        pattern: '',
        searchable: false,
        error: false,
        content: '',
        key: '',
        type: VariablesTypes.Attribute
    }]
    return {
        columns: staticHeaders.concat(formatResponseEvents(enrollmentDetailProgramStage) ?? []),
    }
}
