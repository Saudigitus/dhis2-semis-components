import { CustomAttributeProps } from "../variables/AttributeColumns"

interface GroupFormProps {
    name: string
    description?: string
    fields: CustomAttributeProps[]
}

export type { GroupFormProps }