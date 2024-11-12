/**
 * Specifies the color options for `SummaryCard` component.
 *
 * @export
 * @typedef {ColorProps}
 */
export type ColorProps = "default" | "primary" | "success" | "error" | "warning"

/**
 * Props for the `SummaryCard` component, displaying a summarized value with a label and customizable color.
 *
 * @export
 * @interface CardSummaryProps
 * @typedef {CardSummaryProps}
 */
export interface CardSummaryProps {
    /**
     * The numeric value to display in the summary card.
     *
     * @type {number}
     */
    value: number;

    /**
     * The label text displayed alongside the value in the summary card.
     *
     * @type {string}
     */
    label: string;

    /**
     * The color scheme applied to the card, based on predefined options.
     *
     * @type {ColorProps}
     */
    color: ColorProps;

    /**
     * Custom CSS class name for styling the card container.
     *
     * @type {?string}
     */
    className?: string;
}
