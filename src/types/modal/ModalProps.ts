
interface ModalProps {
    title: string
    open: boolean
    size?: "small" | "medium" | "large"
    position?: "top" | "middle" | "bottom"
    children: React.ReactNode
    setOpen: (value: boolean) => void
}

export type { ModalProps }