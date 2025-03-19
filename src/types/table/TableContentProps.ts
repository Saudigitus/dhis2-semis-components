import { ReactElement } from "react"
import { type CustomAttributeProps } from 'dhis2-semis-types'
import { RowActionsType, TableRowActionsType } from "./TableRowActionsProps"
import { ProgramConfig } from "dhis2-semis-types"

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
    onClick?: (args: any) => void
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
    onChange?: (selected: any, all?: boolean) => void
    sortable: boolean
    showRowActions?: boolean
    selectedAll?: boolean
}

interface RenderRowsProps {
    headerData?: CustomAttributeProps[]
    rowsData: Record<string, any>[]
    searchActions?: boolean
    loading?: boolean
    viewPortWidth: number
    selectedOU?: string
    showRowActions?: boolean
    rowAction: RowActionsType[]
    displayType?: TableRowActionsType
    programConfig: ProgramConfig
    inactiveRowMessage?: string
    onRowClick?: (args: any) => void
    onChange?: (selected: any, all?: boolean) => void
    isCheckbox?: boolean
    indeterminate?: boolean
    selected?: any
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
    title?: string,
    selectable?: boolean,
    viewPortWidth?: number,
    selected?: any,
    setSelected?: (arg: any) => void,
    columns: any,
    totalElements: number,
    loading?: boolean,
    createSortHandler?: () => void,
    order?: "asc" | "desc",
    orderBy?: any,
    rowsPerPages?: { value: number, label: string }[],
    tableData: Record<string, any>[]
    sortable?: boolean,
    selectedOU?: string,
    searchActions?: any
    showRowActions?: boolean
    rowAction?: RowActionsType[]
    displayType?: TableRowActionsType
    defaultFilterNumber?: number
    filterState?: {
        dataElements: any[],
        attributes: any[]
    },
    setFilterState?: (args: {
        dataElements: any[],
        attributes: any[]
    }) => void,
    rightElements?: ReactElement
    programConfig: ProgramConfig
    inactiveRowMessage?: string
    onRowClick?: (teiData: any) => void
    handlePageChange?: (page: any) => void
    handlePageSizeChange?: (pageSize: any) => void
    page?: number
    pageSize?: number
    showHeaderFilters?: boolean
    showWorkingListsContainer?: boolean
    paginate?: boolean
}


type TableDataProps = Record<string, string>;


export type { TableRenderProps, TableComponentProps, HeaderCellProps, RowProps, RenderHeaderProps, RenderRowsProps, EnrollmentDetailsComponentProps, TableSortProps, TableDataProps }