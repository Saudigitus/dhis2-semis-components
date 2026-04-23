interface PaginationProps {
    dataTest: string
    page: number
    rowsPerPage: number
    onPageChange: (page: number) => void
    onRowsPerPageChange: (rowsPerPage: number) => void
    loading: boolean
    totalData?: number
    totalElements?: number
    disablePreviousPage: boolean
    disableNextPage: boolean
    rowsPerPages?: { value: number, label: string }[]
}



interface IconButtonPaginationProps {
    dataTest: string
    onPageChange: (page: number) => void
    ariaLabel: string
    disabled: boolean
    Icon: React.ReactNode
}

export type { PaginationProps, IconButtonPaginationProps }