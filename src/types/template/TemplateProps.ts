/**
 * Description placeholder
 *
 * @typedef {EnumBorderType}
 */
type EnumBorderType = "all" | "bottom" | "top" | "left" | "right"

interface WithBorderProps {
    /**
     * Your react node wich will be wrapped whith this component
     *
     * @type {?React.ReactNode}
     */
    children?: React.ReactNode

    /**
     * Border types or border locations wich can only be "all" | "bottom" | "top"  | "left" | "right"
     *
     * @type {EnumBorderType}
     */
    type: EnumBorderType

    /**
     * Your custom css props
     *
     * @type {?*}
     */
    style?: any
}

interface WithPaddingProps {
    /**
     *  Your react node wich will be wrapped whith this component
     *
     * @type {?React.ReactNode}
     */
    children?: React.ReactNode

    /**
     * your padding values in the known format.
     * 
     * Eg: "10px", "12px 4vh 5em", "5px 10px", ...
     *
     * @type {?string}
     */
    p?: string

    /**
     * Your custom css props
     *
     * @type {?Object}
     */
    style?: Object
}

export type { WithBorderProps, WithPaddingProps }
