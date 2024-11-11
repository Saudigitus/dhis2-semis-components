type TableRowActionsType = "icon" | "menu"

interface TableRowActionsProps {
    loading: boolean
    disabled: boolean
    actions: RowActionsType[]
    displayType?: TableRowActionsType
}

interface RowActionsType {
    label: string
    color?: string
    loading: boolean
    disabled: boolean
    icon: React.ReactNode
    onClick: (arg?: any) => void
}

interface RowActionsProps {
    disabled: boolean
    actions: RowActionsType[]
}


export type { TableRowActionsProps, RowActionsType, RowActionsProps, TableRowActionsType }