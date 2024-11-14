/**
 * Represents a single button item with a unique identifier and label.
 *
 * @interface SimpleButtonType
 * @typedef {SimpleButtonType}
 */
interface SimpleButtonType {
    /**
     * A unique identifier for the button item.
     *
     * @type {string}
     */
    id: string;
    
    /**
     * The label displayed on the button. If not provided, a default label may be shown.
     *
     * @type {?string}
     */
    label?: string;
}

/**
 * Props for the SimpleButtonsComponent, which renders a group of selectable buttons.
 *
 * @interface SimpleButtonsComponentProps
 * @typedef {SimpleButtonsComponentProps}
 */
interface SimpleButtonsComponentProps {
    /**
     * Array of button items to display within the component. Each item should contain an ID and optionally a label.
     *
     * @type {SimpleButtonType[]}
     */
    items: SimpleButtonType[];

    /**
     * Maximum number of buttons to display in a single row before switching to a dropdown.
     *
     * @type {?number}
     */
    maxLinearItems?: number;

    /**
     * Currently selected button item. If undefined, no item is selected by default.
     *
     * @type {(SimpleButtonType | undefined)}
     */
    selected: SimpleButtonType | undefined;

    /**
     * Callback function to set the selected item. Takes a `SimpleButtonType` object as an argument.
     *
     * @type {(arg: SimpleButtonType) => void}
     */
    setSelected: (arg: SimpleButtonType | any) => void;

    /**
     * Auxiliary callback function triggered when an item is selected. 
     * This function can perform additional actions upon selection.
     *
     * @type {() => void}
     */
    onSelect: () => void;

    /**
     * Custom CSS class name to apply to the button elements for additional styling.
     *
     * @type {?string}
     */
    buttonClassName?: string;
}

export type { SimpleButtonsComponentProps, SimpleButtonType };
