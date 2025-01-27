import { useState, useEffect } from 'react'
import { CustomAttributeProps } from '../../types/variables/AttributeColumns';
import { formatResponseAttributes } from '../../utils/format/formatTeiAttributes';
import { GroupedSearchableAttributesTypes } from '../../types/variables/GroupedSearchableAttributesTypes'

export default function useGetSearchEnrollmentForm({ programConfig }) {
    const [searchEnrollmentFields, setSearchEnrollmentFields] = useState<GroupedSearchableAttributesTypes[]>([])

    const buildSearhForm = () => {
        if (programConfig !== undefined) {

            const formSearchableAttributes = formatResponseAttributes(programConfig).filter((element) => element.unique === true || element.searchable === true).map((el) => { return { ...el, disabled: false, required: false } })

            setSearchEnrollmentFields(groupAttributes(formSearchableAttributes))
        }
    }

    const groupAttributes = (variables: CustomAttributeProps[]) => {
        const uniqueObjectGroups: GroupedSearchableAttributesTypes[] = [];
        const searchableObjects: CustomAttributeProps[] = [];

        variables.forEach(variable => {
            if (variable.unique) {
                const groupIndex = uniqueObjectGroups.findIndex(group => group.name === variable.displayName);
                if (groupIndex === -1) {
                    uniqueObjectGroups.push({ name: variable.displayName, id: variable.id, variables: [variable] });
                } else {
                    uniqueObjectGroups[groupIndex].variables.push(variable);
                }
            } else {
                searchableObjects.push(variable);
            }
        });

        const resultArray: GroupedSearchableAttributesTypes[] = uniqueObjectGroups.concat([{ name: "attributes", id: "attributes", variables: searchableObjects }]);
        return resultArray;

    }

    useEffect(() => {
        buildSearhForm();
    }, []);

    return { searchEnrollmentFields }
}
