interface DatePickerProps {
    setValue: (args: any) => void
    value: any[]
    disabled: boolean
}

interface DropDownCalendarProps {
    setValue: ({ selectedDate }: { selectedDate: Date }) => void
    dateDisabler?: (date: Date, config: SchoolCalendar) => boolean
    label: string
    icon?: any
    value?: string
    config?: SchoolCalendar
}

interface CalendarProps {
    value: { selectedDate: Date }
    dateDisabler?: (date: Date, config: SchoolCalendar) => boolean
    setValue: ({ selectedDate }: { selectedDate: Date }) => void
    config?: SchoolCalendar
}

interface SchoolCalendar {
    classPeriods: [
        {
            description: string
            endDate: string
            startDate: string
        }
    ]
    holidays: [
        {
            date: any
            event: string
        }
    ]
    weekDays: {
        friday: boolean
        monday: boolean
        saturday: boolean
        sunday: boolean
        thursday: boolean
        tuesday: boolean
        wednesday: boolean
    }
}
export type { CalendarProps, DatePickerProps, DropDownCalendarProps, SchoolCalendar }