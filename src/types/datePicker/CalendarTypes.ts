interface DatePickerProps {
    setValue: (args: any) => void
    value: any[]
    disabled: boolean
}

interface DropDownCalendarProps {
    setValue: ({ selectedDate }: { selectedDate: Date }) => void
    dateDisabler?: (args: any) => boolean
    label: string
    icon?: any
    value?: string
}

interface CalendarProps {
    value: { selectedDate: Date }
    dateDisabler?: (args: any) => boolean
    setValue: ({ selectedDate }: { selectedDate: Date }) => void
}

export type { CalendarProps, DatePickerProps, DropDownCalendarProps }