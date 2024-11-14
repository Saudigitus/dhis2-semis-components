import { CustomAttributeProps } from "../variables/AttributeColumns"

/**
 * Description placeholder
 *
 * @export
 * @interface EnrollmentFilterProps
 * @typedef {EnrollmentFilterProps}
 */
export interface EnrollmentFilterProps {
    /**
     * The list containing the variables that will be used to make the filters
     *
     * @type {CustomAttributeProps[]}
     */
    variables: CustomAttributeProps[]

    /**
     * The default number of filters that will be visible 
     *
     * @type {?number}
     */
    defaultFilterNumber?: number

    /**
     * The state that will contain the formatted filters updated whenever a value
     * 
     * is added to one of the filters
     *
     * @type {{
     *         dataElements: any[],
     *         attributes: any[]
     *     }}
     */
    filterState: {
        dataElements: any[],
        attributes: any[]
    },

    /**
     * The function that will be responsible for updating the state whenever you add a fi
     *
     * @type {(args: {
     *         dataElements: any[],
     *         attributes: any[]
     *     }) => void}
     */
    setFilterState: (args: {
        dataElements: any[],
        attributes: any[]
    }) => void
}