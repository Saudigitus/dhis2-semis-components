import { CustomAttributeProps } from "../variables/AttributeColumns"

export interface EnrollmentFilterProps {
    headers: CustomAttributeProps[]
    defaultFilterNumber?: number
    filterState: {
        dataElements: any[],
        attributes: any[]
    },
    setFilterState: (args: {
        dataElements: any[],
        attributes: any[]
    }) => void
}