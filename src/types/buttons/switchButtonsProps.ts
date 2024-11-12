interface SimpleButtonType {
    id: string
    label?: string
}

interface SimpleButtonsComponentProps {
    items: SimpleButtonType[]
    maxLinearItems?: number
    selected: SimpleButtonType | undefined
    setSelected: (arg: SimpleButtonType | any) => void
    onSelect: () => void
}


export type { SimpleButtonsComponentProps, SimpleButtonType }
