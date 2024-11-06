interface DropZoneProps {
    onSave: (args: any) => void;
    accept: string
    placeholder?: string
    hideIcon?: boolean
    hideLabel?: boolean
    height?: string
    width?: string
    dialogMode?: boolean
    title?: string
    buttonLabel?: string
}

export type { DropZoneProps }