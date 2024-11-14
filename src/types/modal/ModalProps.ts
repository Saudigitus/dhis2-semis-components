import { ButtonProps } from "@dhis2/ui"

/**
 * Modal action buttons interface. It extends ButtonProps from @dhis2/ui and adds a new props as color.
 * @interface ModalActionButtonType
 * @typedef {ModalActionButtonType}
 * @extends {ButtonProps}
 */
interface ModalActionButtonType extends ButtonProps {
    /**
     * Custom button color. Cannot be used in the same time whit primary or secondary true as it set a new background color to the button.
     * @type {?string}
     */
    color?: string
}

/**
 * Modal component interface.
 * @interface ModalProps
 * @typedef {ModalProps}
 */
interface ModalProps {
    /**
     * The text to display at the top of the modal.
     * @type {string}
     */
    title: string
    /**
     * The variable that controls the modal opening. If true, the modal is open.
     * @type {boolean}
     */
    open: boolean
    /**
     * This variable controls if the modal must be closed whith mouse or keyboard event.
     * @type {?boolean}
     */
    isClickAway?: boolean
    /**
     * A function prop to set the open variable to false and consequenlty close the modal.
     * @type {() => void}
     */
    handleClose: () => void
    /**
     * The modal body.
     * @type {React.ReactNode}
     */
    children: React.ReactNode
    /**
     * This variable sets the modal width. Optional. Default is "large".
     * @type {?("small" | "medium" | "large")}
     */
    size?: "small" | "medium" | "large"
    /**
     * This variable sets the modal position relative to the screen. Optional. Default is "top"
     * @type {?("top" | "middle" | "bottom")}
     */
    position?: "top" | "middle" | "bottom",
    /**
     * A prop to send modal actions. Optional.
     * @type {?ModalActionButtonType[]}
     */
    actions?: ModalActionButtonType[]
    /**
     * A variable to show a loader while modal children are processing. Must be true modal children are processing. Optional
     * @type {?boolean}
     */
    loading?: boolean
}

export type { ModalProps }