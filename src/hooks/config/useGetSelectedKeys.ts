import { useGetSectionTypeLabel } from "dhis2-semis-functions";
import useProgramsKeys from "../appWrapper/useProgramsKeys";
import { useDataStoreKey } from "../dataStore/useDataStoreKey";

export default function useGetSelectedKeys() {
    const programsValues = useProgramsKeys();
    const { sectionName } = useGetSectionTypeLabel();
    const dataStoreData = useDataStoreKey({ sectionType: sectionName });

    return {
        dataStoreData,
        program: programsValues?.find((program) => program?.id == dataStoreData?.program)
    }
}