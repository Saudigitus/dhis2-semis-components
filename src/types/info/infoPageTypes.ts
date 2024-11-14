interface InfoTypes {
    /**
     * The container title
     *
     * @type {?string}
     */
    title?: string

    /**
     * the title font weight
     *
     * @type {?("bold" | "normal")}
     */
    fontWeigth?: "bold" | "normal"

    /**
     * These are the instruction sections that will be displayed on the information page
     *
     * @type {[
     *         {
     *             sectionTitle: string,
     *             instructions: string[]
     *         }
     *     ]}
     */
    sections: [
        {
            sectionTitle: string,
            instructions: string[]
        }
    ]
}

export type { InfoTypes }