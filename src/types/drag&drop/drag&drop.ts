import { CustomAttributeProps } from "../variables/AttributeColumns"

export interface DragDropListProps {
    /**
     * The state containing the list of values to be displayed in the component
     *
     * @type {CustomAttributeProps[]}
     */
    listItems: CustomAttributeProps[]

    /**
     * Items container width
     *
     * @type {?string}
     */
    width?: string

    /**
     * The list of components comes with the check component for whatever reason you like.
     * 
     * You can choose whether you want this functionality or not by passing a value of 
     * 
     * ‘true’ or ‘false’ for it.
     *
     * @type {?boolean}
     */
    checkable?: boolean

    /**
     * The title or name of the list, it appear on top of the list
     *
     * @type {string}
     */
    title: string

    /**
     * The function that updates the state of the items when they are moved or updates
     * 
     * the value of the checkbox if it is visible.
     *
     * @type {(args: CustomAttributeProps[]) => void}
     */
    setListItems: (args: CustomAttributeProps[]) => void
}
