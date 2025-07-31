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

interface defaults {
    academicYear: string
}

interface ClassPeriodType {
    key: string
    description: string
    endDate: string
    startDate: string
}

interface HolidayType {
    date: Date
    event: string
    type: string
}

interface SchoolCalendar {
    id: string
    key: string
    defaults: defaults
    academicYear: {
        "endDate": string
        "startDate": string
        "code": string
        "label": string
        "description": string
        "type": string
    }
    classPeriods: ClassPeriodType[]
    holidays: HolidayType[]
    weekDays: {
        "friday": boolean
        "monday": boolean
        "saturday": boolean
        "sunday": boolean
        "thursday": boolean
        "tuesday": boolean
        "wednesday": boolean
    }
}

export type { CalendarProps, DatePickerProps, DropDownCalendarProps, SchoolCalendar }