import { CustomAttributeProps } from "../variables/AttributeColumns"

interface GroupFormProps {
    name: string
    description?: string
    fields: CustomAttributeProps[]
}

interface FormProps {
    /**
     * The form fields 
     *
     * @type {GroupFormProps[]}
     */
    formFields: GroupFormProps[]

    /**
     * Form container css
     *
     * @type {?{}}
     */
    style?: {}

    /**
     * If you want an action whenever the value of a field changes, use this variable to
     * 
     * send your function and make your system shine. Just make the function receive 
     * 
     * the values that will be returned 
     *
     * @type {(args: any) => void}
     */
    onInputChange: (args: any) => void

    /**
     * The function that will be executed when the form is submitted, you just have 
     * 
     * to create your logic knowing that this function must receive an object with 
     * 
     * the f values as a parameter.
     *
     * @type {(args: any) => void}
     */
    onFormSubtmit: (e: any) => void

    /**
     * If you want to show feedback while processing the data after submitting the form,
     * 
     *  just pass a boolean value to this variable.
     *
     * @type {?boolean}
     */
    loading?: boolean

    /**
     * an object containing the initial values of the form
     *
     * @type {?{}}
     */
    initialValues?: {}

    /**
     * For data visualisation only, you may not want to submit the form or perform any
     * 
     *  operations on the data, so this variable is assigned a boolean value to hide
     * 
     *  the cancel or submit form buttons.
     *
     * @type {?boolean}
     */
    withButtons?: boolean
}

export type { GroupFormProps, FormProps }