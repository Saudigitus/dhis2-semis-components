interface DatePickerProps {
    setValue: (args: any) => void
    value: any[]
    disabled: boolean
}

interface CalendarProps {
    value: { selectedDate: Date }
    setValue: ({ selectedDate }: { selectedDate: Date }) => void
}

export type { CalendarProps, DatePickerProps }