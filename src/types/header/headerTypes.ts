import { ReactNode } from "react"

type PositionProps = "sticky" | "fixed"
type AlignProps = "right" | "left"

export interface OptionProps {
    value: string
    label: string
    icon?: ReactNode
}

export interface SemisHeaderProps {
    grades: { options?: OptionProps[], loader?: boolean }
    classes: { options?: OptionProps[], loader?: boolean }
    academicYears: { options?: OptionProps[], loader?: boolean }
    orgunits: { options?: OptionProps[], loader?: boolean }
}

export interface HeaderItemProps {
    label?: string
    value?: any
    valuePlaceholder?: string
    icon?: ReactNode
    withDropDown?: boolean
    customAction?: () => void
    searchInputPlaceholder?: string
    isSeachable?: boolean,
    options?: OptionProps[]
    onSelectOption?: () => void
    align?: AlignProps
}

export interface MainHeaderProps {
    height?: string
    width?: string
    padding?: string
    position?: PositionProps
    headerItems?: HeaderItemProps[]
    semisHeader?: SemisHeaderProps
}