interface TextProps {
    /**
     * The text to display.
     * @type {string}
     */
    label: string
    /**
     * The type of text. Each one has a special styles.
     * @type {("title" | "subtitle")}
     */
    type: "title" | "subtitle"
    /**
     * Font weight.
     * @type {?("normal" | "bold")}
     */
    weight?: "normal" | "bold"
}

export type { TextProps }