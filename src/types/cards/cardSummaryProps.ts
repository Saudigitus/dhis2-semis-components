export type ColorProps = "default" | "primary" | "success" | "error" | "warning"

export interface CardSummaryProps {
    value: number
    label: string
    color: ColorProps
    className?: string
}