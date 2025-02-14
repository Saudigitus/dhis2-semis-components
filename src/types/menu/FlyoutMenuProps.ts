interface FlyoutMenuProps {
    options: FlyoutOptionsProps[]
}

/**
 * Interface representing the properties for flyout menu options.
 */
interface FlyoutOptionsProps {
    /**
     * The label text for the menu option.
     */
    label: string;

    /**
     * Optional boolean indicating if a divider should be shown after this option.
     */
    divider?: boolean;

    /**
     * Optional boolean indicating if the menu option is disabled.
     */
    disabled?: boolean;

    /**
     * Function to be called when the menu option is clicked.
     */
    onClick: () => void;
}

export type { FlyoutOptionsProps, FlyoutMenuProps }