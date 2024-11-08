import { CustomAttributeProps } from "../variables/AttributeColumns.ts"

interface TableProps {
    head: any
    footer: any
}

interface TableComponentProps {
    children?: React.ReactNode
    className?: string
}

interface HeaderCellProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: TableProps
    colspan?: number
    onClick?: () => void
}

interface RowProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: TableProps
    inactive?: boolean
    isOwnershipOu?: boolean
    title?: string
    disableHoverListener?: boolean
    tooltip?: boolean
}

interface RowActionsType {
    label: string
    onClick: (arg?: any) => void
    icon: React.ReactNode
    disabled: boolean
    color?: string
}
interface RowActionsProps {
    row: any
    onSelectTei?: (arg: any) => void
    onShowHistory?: () => void
}


interface RenderHeaderProps {
    rowsHeader?: CustomAttributeProps[]
    orderBy?: string
    order?: "asc" | "desc"
    createSortHandler?: (property: string) => any
    loading?: boolean,
    isCheckbox?: boolean
    checked?: boolean
    indeterminate?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    sortable: boolean
}

interface RenderRowsProps {
    headerData?: CustomAttributeProps[]
    rowsData: Record<string, any>[]
    searchActions?: boolean
    loading?: boolean
    viewPortWidth: number
    isInactive: boolean
    isOwnershipOu: boolean
    showEnrollments: boolean
}

interface EnrollmentDetailsComponentProps {
    enrollmentsData: any
    existingAcademicYear: boolean
    onSelectTei?: (arg: any) => void
}

interface TableSortProps {
    children?: React.ReactNode
    active: boolean
    direction?: 'asc' | 'desc'
    createSortHandler: (rowsPerPage: string) => void
}


type TableDataProps = Record<string, string>;


export type { TableComponentProps, HeaderCellProps, RowProps, RowActionsType, RowActionsProps, RenderHeaderProps, RenderRowsProps, EnrollmentDetailsComponentProps, TableSortProps, TableDataProps }