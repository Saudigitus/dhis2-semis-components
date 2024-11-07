import { type Attribute } from '../generated';

export enum VariablesTypes {
    DataElement = "dataElement",
    Attribute = "attribute",
    Attendance = "attendance"
}

export enum enrollmentStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export interface CustomAttributeProps {
    id: string
    displayName: string
    header: string
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
    content?: string
    key?: any
    description?: string
    type: VariablesTypes
    value?: string
    class?: string
    initialOptions?: any
}

export interface OptionsProps {
    value: string
    label: string
}

export interface AttendanceOptionsProps {
    code: string
    key: string
}
