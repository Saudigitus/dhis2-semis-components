import { Attribute } from "dhis2-semis-types";
import { OptionsProps } from "dhis2-semis-types"

export enum VariablesTypes {
    DataElement = "dataElement",
    Attribute = "attribute",
    Custom = "custom",
    Default = "default"
}

export enum enrollmentStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export interface CustomAttributeProps {
    id: string
    displayName: string
    header?: string
    required: boolean
    name: string
    programStage?: string
    assignedValue?: string
    labelName: string
    valueType: typeof Attribute.valueType
    disabled: boolean
    visible: boolean
    options?: {
        optionSet: {
            id: string
            options: OptionsProps[]
        }
    }
    pattern?: string
    searchable?: boolean
    error?: boolean
    warning?:boolean
    content?: string
    key?: any
    description?: string
    displayInFilters?: boolean
    type: VariablesTypes
    trackedEntity?: string
    placeholder?: string
    unique?: boolean
    value?: string
    class?: string
    initialOptions?: any
}

export interface AttendanceOptionsProps {
    code: string
    key: string
}
