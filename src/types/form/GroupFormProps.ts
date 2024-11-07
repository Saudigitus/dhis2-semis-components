import { CustomAttributeProps } from "../variables/AttributeColumns"

interface GroupFormProps {
    name: string
    description?: string
    fields: CustomAttributeProps[]
}

interface FormProps {
    formFields: GroupFormProps[]
    style?: {}
    onInputChange: (args: any) => void
    onFormSubtmit: () => void
    loading?: boolean
    initialValues?: {}
    withButtons?: boolean
}
export type { GroupFormProps, FormProps }