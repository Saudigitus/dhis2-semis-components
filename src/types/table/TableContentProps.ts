import { CustomAttributeProps } from "../variables/AttributeColumns.ts"
import { RowActionsType, TableRowActionsType } from "./TableRowActionsProps.ts"

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
    showRowActions?: boolean
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
    showRowActions?: boolean
    rowAction: RowActionsType[]
    displayType?: TableRowActionsType
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
    className?: string
}

interface TableRenderProps {
    viewPortWidth: number,
    columns: any,
    totalElements: number,
    loading: boolean,
    createSortHandler: () => void,
    order: "asc" | "desc",
    orderBy: any,
    rowsPerPages?: { value: number, label: string }[],
    tableData: Record<string, any>[]
    sortable: boolean,
    isInactive: boolean,
    isOwnershipOu: boolean,
    showEnrollments: boolean,
    searchActions?: any
    showRowActions?: boolean
    rowAction: RowActionsType[]
    displayType?: TableRowActionsType
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


type TableDataProps = Record<string, string>;


export type { TableRenderProps, TableComponentProps, HeaderCellProps, RowProps, RenderHeaderProps, RenderRowsProps, EnrollmentDetailsComponentProps, TableSortProps, TableDataProps }