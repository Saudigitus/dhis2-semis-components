import { CustomAttributeProps, OptionsProps } from "../variables/AttributeColumns"

interface GenericFieldsComponentProps {
    attribute: CustomAttributeProps
    disabled: boolean
    valueType: CustomAttributeProps["valueType"]
    form: any
    onInputChange: (e: any) => void
}

interface FormFieldsProps {
    name: string
    disabled: boolean
    required: string | boolean
    type?: string
    optionSet?: CustomAttributeProps["options"]
    trackedEntity?: string
    form?: any
}

interface MutlipleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}

interface AutoCompleteProps {
    disabled?: boolean
    options: CustomAttributeProps["options"]
    name: string
    required?: string | boolean
    onChange: (args: any) => void
    style?: any
}

interface SwitchFieldProps {
    disabled: boolean
    required: string | boolean
}

interface CheckFieldProps {
    name: string
    disabled: boolean
    required: string | boolean
}


interface SingleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}


export type { GenericFieldsComponentProps, FormFieldsProps, MutlipleSelectProps, AutoCompleteProps, SwitchFieldProps, CheckFieldProps, SingleSelectProps }
