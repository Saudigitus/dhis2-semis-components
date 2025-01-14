import { ReactElement } from "react"
import { CustomAttributeProps } from "../variables/AttributeColumns"
import { RowActionsType, TableRowActionsType } from "./TableRowActionsProps"
import { ProgramConfig } from "../programConfig/ProgramConfig"

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
    selectedOU?: string
    showEnrollments: boolean
    showRowActions?: boolean
    rowAction: RowActionsType[]
    displayType?: TableRowActionsType
    programConfig: ProgramConfig
    inactiveRowMessage?: string
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
    viewPortWidth?: number,
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
    showEnrollments?: boolean,
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
}


type TableDataProps = Record<string, string>;


export type { TableRenderProps, TableComponentProps, HeaderCellProps, RowProps, RenderHeaderProps, RenderRowsProps, EnrollmentDetailsComponentProps, TableSortProps, TableDataProps }