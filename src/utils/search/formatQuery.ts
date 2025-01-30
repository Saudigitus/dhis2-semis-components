import { GroupedSearchableAttributesTypes } from "../../types/variables/GroupedSearchableAttributesTypes";
import { filterCollapsedAttributes } from "./filterCollapsedAttributes";

export const formattedQuery = (teiAttributes: any, searchEnrollmentFields: GroupedSearchableAttributesTypes, collapseAttributes: any, queryForm: any) => {
    var query = "";
    for (const [key, value] of Object.entries(
        filterCollapsedAttributes(searchEnrollmentFields,
            collapseAttributes,
            queryForm
        ))) {
        if (key && value) {
            const id = teiAttributes?.filter((element) => {
                return element.name == key;
            })[0].name;

            if (id) {
                query += `${id}:LIKE:${value},`;
            }
        }
    }
    return query;
}