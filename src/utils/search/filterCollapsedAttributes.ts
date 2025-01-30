import { CustomAttributeProps } from "dhis2-semis-types";
import { GroupedSearchableAttributesTypes } from "../../types/variables/GroupedSearchableAttributesTypes";

export const filterCollapsedAttributes = (searchEnrollmentFields: GroupedSearchableAttributesTypes, collapseAttributes: any, queryForm: any) => {
    // filter collapsed attributes from filled fields
    const selectedObjectIDs: string[] = searchEnrollmentFields[collapseAttributes]?.variables.map((obj: CustomAttributeProps) => obj.id);
    const filteredQueryForm: { [id: string]: string } = {};

    Object.keys(queryForm).forEach(key => {
        if (selectedObjectIDs.includes(key as unknown as string)) {
            filteredQueryForm[key] = queryForm[key];
        }
    });
    return filteredQueryForm;
}
