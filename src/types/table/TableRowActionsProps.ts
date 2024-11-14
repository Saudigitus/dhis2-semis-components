type TableRowActionsType = "icon" | "menu"

interface TableRowActionsProps {
    /**
     * To disable the component when true. Must be true if the data are being loaded.
     * @type {boolean}
     */
    loading: boolean
    /**
     * To set all actions disabled.
     * @type {boolean}
     */
    disabled: boolean
    /**
     * An array of the required actions.
     * @type {RowActionsType[]}
     */
    actions: RowActionsType[]
    /**
     * To set the actions component display mode.
     * @type {?TableRowActionsType}
     */
    displayType?: TableRowActionsType
}

interface RowActionsType {
    /**
     * The action help text.
     * @type {string}
     */
    label: string
    /**
     * A color for the action icon.
     * @type {?string}
     */
    color?: string
    /**
     * To show a centered loader instead of the action when true.
     * @type {boolean}
     */
    loading: boolean
    /**
     * To set the action disabled
     * @type {boolean}
     */
    disabled: boolean
    /**
     * The action icon.
     * @type {React.ReactNode}
     */
    icon: React.ReactNode
    /**
     * The action event.
     * @type {(arg?: any) => void}
     */
    onClick: (arg?: any) => void
}

interface RowActionsProps {
    /**
     * Sets the whole component disabled if true.
     * @type {boolean}
     */
    disabled: boolean
    /**
     * An array of the required actions.
     * @type {RowActionsType[]}
     */
    actions: RowActionsType[]
}


export type { TableRowActionsProps, RowActionsType, RowActionsProps, TableRowActionsType }