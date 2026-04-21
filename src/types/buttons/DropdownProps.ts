import { FlyoutOptionsProps } from "../menu/FlyoutMenuProps"


/**
 * Interface representing the properties for a dropdown component.
 * 
 * @interface DropdownProps
 * 
 * @property {string} name - The name of the dropdown.
 * @property {boolean} disabled - Indicates whether the dropdown is disabled.
 * @property {React.ReactElement} [icon] - Optional icon to be displayed in the dropdown.
 * @property {FlyoutOptionsProps[]} options - Array of options to be displayed in the dropdown.
 */
interface DropdownProps {
    name: string
    disabled: boolean
    icon?: React.ReactElement
    options: FlyoutOptionsProps[]
    id?: string
    dataTest: string
}

export type { DropdownProps }