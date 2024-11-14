import { ButtonProps } from "@dhis2/ui"

interface ModalActionButtonType extends ButtonProps {
    /** Button custom color */
    color?: string
    name?: string
}

interface ModalProps {
    /** The title that appears in the modal. */
    title: string
    /** The variable which controls the modal status. If true the modal is opened. */
    open: boolean
    /** This variable determines if the modal will be closed with click away. */
    isClickAway?: boolean
    /** To set the open value to false. */
    handleClose: () => void
    /** The modal body content. */
    children: React.ReactNode
    /** To set modal width. Default - large.  */
    size?: "small" | "medium" | "large"
    /** To set modal position on app window. Default - middle.*/
    position?: "top" | "middle" | "bottom",
    /** An array of buttons props to generate action buttons in modal*/
    actions?: ModalActionButtonType[]
    /** Will be true if data to fill modal is processing*/
    loading?: boolean
}

export type { ModalProps }