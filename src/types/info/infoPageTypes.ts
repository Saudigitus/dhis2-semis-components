interface InfoTypes {
    title?: string
    fontWeigth?: "bold" | "normal"
    sections: [
        {
            sectionTitle: string,
            instructions: string[]
        }
    ]
}

export type { InfoTypes }