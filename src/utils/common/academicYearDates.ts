// Dates of the academic year in the school calendar, used to limit the period of an export.
export function academicYearDates(calendar: any): { minDate?: Date, maxDate?: Date } {
    const start = calendar?.academicYear?.startDate, end = calendar?.academicYear?.endDate
    return {
        minDate: start ? new Date(`${String(start).slice(0, 10)}T00:00:00`) : undefined,
        maxDate: end ? new Date(`${String(end).slice(0, 10)}T00:00:00`) : undefined,
    }
}

// A date moved inside the limits (the picker opens on a day that can be chosen).
export function dateWithin(date: Date, minDate?: Date, maxDate?: Date): Date {
    if (minDate && date < minDate) return minDate
    if (maxDate && date > maxDate) return maxDate
    return date
}
