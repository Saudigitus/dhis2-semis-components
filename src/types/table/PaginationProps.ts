interface PaginationProps {
    page: number
    rowsPerPage: number
    onPageChange: (page: number) => void
    onRowsPerPageChange: (rowsPerPage: number) => void
    loading: boolean
    totalPerPage: number
    disablePreviousPage: boolean
    disableNextPage: boolean
    rowsPerPages?: { value: number, label: string }[]
}



interface IconButtonPaginationProps {
    onPageChange: (page: number) => void
    ariaLabel: string
    disabled: boolean
    Icon: React.ReactNode
}

export type { PaginationProps, IconButtonPaginationProps }