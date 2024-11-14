import { ReactNode } from "react"

type PositionProps = "sticky" | "fixed"
type AlignProps = "right" | "left"

export interface OptionProps {
    value: string
    label: string
    icon?: ReactNode
}

export interface SemisHeaderProps {
    academicYears?: { dataElement: { displayName: string, id: string }, options?: OptionProps[], loader?: boolean }
    orgunits?: { roots: string[], loader?: boolean }
    restItems?: { dataElement: { displayName: string, id: string }, options?: OptionProps[], loader?: boolean }[]
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
    customComponent?: ReactNode
}

export interface MainHeaderProps {
    height?: string
    width?: string
    padding?: string
    position?: PositionProps
    headerItems?: HeaderItemProps[]
    semisHeader?: SemisHeaderProps
}