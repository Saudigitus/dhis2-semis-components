import { useEffect, useRef, useState } from 'react'
import Calendar from './Calendar';
import { format, startOfDay, isBefore, isAfter, subDays } from 'date-fns';
import style from './datepicker.module.css'
import { DropDownCalendarProps, SchoolCalendar } from '../../types/datePicker/CalendarTypes';
import { Button as Dhis2Btn } from "@dhis2/ui";
import { Button, Chip, Paper, Popover, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { TranslationState } from '../../schemas/translationsSchema';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const parseDate = (value?: string): Date | undefined => {
    if (!value) return undefined
    const date = new Date(value)
    return isNaN(date.getTime()) ? undefined : startOfDay(date)
}

const getCalendarRange = (config?: SchoolCalendar, academicYear?: string, academicYearPeriod?: { startDate?: string; endDate?: string }) => {
    const source = academicYearPeriod ?? config?.academicYear
    return {
        minDate: parseDate(source?.startDate) ?? parseDate(academicYear ? `${academicYear}-01-01` : undefined),
        maxDate: parseDate(source?.endDate) ?? parseDate(academicYear ? `${academicYear}-12-31` : undefined),
    }
}

const getDefaultSelectedDate = (minDate?: Date, maxDate?: Date, dateDisabler?: DropDownCalendarProps['dateDisabler'], config?: SchoolCalendar): Date => {
    const today = startOfDay(new Date())
    const beforeRange = minDate ? isBefore(today, minDate) : false
    const afterRange = maxDate ? isAfter(today, maxDate) : false

    if (!beforeRange && !afterRange) return today
    if (!maxDate) return today

    let lastSchoolDay = startOfDay(maxDate)
    for (let day = 0; day < 366 && dateDisabler?.(lastSchoolDay, config as SchoolCalendar); day++) {
        lastSchoolDay = subDays(lastSchoolDay, 1)
    }
    return lastSchoolDay
}

export default function DropDownCalendar(props: DropDownCalendarProps) {
    const { setValue, dateDisabler, label, icon, value, config, onCancel, showSelected = false, academicYear, academicYearPeriod } = props
    const { minDate, maxDate } = getCalendarRange(config, academicYear, academicYearPeriod)
    const [localDateSelected, setlocalDateSelected] = useState<{ selectedDate: Date }>(() => ({
        selectedDate: getDefaultSelectedDate(minDate, maxDate, dateDisabler, config)
    }))
    const [anchorCalendar, setAnchorCalendat] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [showSelectedChip, setShowSelectedChip] = useState<boolean>(false);
    const i18n = useRecoilValue(TranslationState) as any
    const ref = useRef<any>(null)
    const showInput = showSelected ? !showSelectedChip : true

    useEffect(() => {
        setShowSelectedChip((!!value?.selectedDate || !!value))
    }, [value])

    useEffect(() => {
        setlocalDateSelected((prev) => {
            const current = prev?.selectedDate
            const isOutOfRange = (minDate && isBefore(current, minDate)) || (maxDate && isAfter(current, maxDate))
            return isOutOfRange ? { selectedDate: getDefaultSelectedDate(minDate, maxDate, dateDisabler, config) } : prev
        })
    }, [minDate?.getTime(), maxDate?.getTime()])

    const closeAnchor = () => {
        onCancel?.();
        setAnchorCalendat(null);
        setOpen(false);
        if (value?.selectedDate || value) {
            setShowSelectedChip(true)
        }
    };

    return (
        <>
            {
                (showSelectedChip && showSelected) &&
                <Chip
                    onClick={() => {
                        setShowSelectedChip(false)
                        setAnchorCalendat(ref.current), setOpen(true)
                    }}
                    deleteIcon={<CalendarMonthIcon />}
                    sx={{
                        "& .MuiChip-deleteIcon": {
                            color: "#ededed",
                        },
                        "& .MuiChip-deleteIcon:hover": {
                            color: "#fff",
                        },
                    }}
                    onDelete={() => {
                        setShowSelectedChip(false)
                        setAnchorCalendat(ref.current), setOpen(true)
                    }}
                    className={style.chip}
                    label={`${i18n.t('Selected date')}: ${(value?.selectedDate || value)
                        && format(new Date(value?.selectedDate ?? value), 'dd/MM/yyyy')}`}
                />
            }

            <span
                style={{
                    display: showInput ? "inline-flex" : "none",
                }} ref={ref} onClick={() => { setAnchorCalendat(ref.current), setOpen(true) }}
            >
                <Dhis2Btn
                    icon={icon}
                >
                    {label}
                </Dhis2Btn>
            </span>

            <Popover
                open={open}
                anchorEl={anchorCalendar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Paper>
                    <div className={style.datepickerTypography}>
                        <Typography variant="overline">{i18n.t("SELECT DATE")}</Typography>
                        <Typography variant="h4" className="mt-2">{format(new Date(localDateSelected.selectedDate), "E, MMM dd - YYY")}</Typography>
                    </div>
                    <Calendar config={config} minDate={minDate} maxDate={maxDate} dateDisabler={dateDisabler} setValue={setlocalDateSelected} value={localDateSelected} />
                    <div className={style.datepickerButtons}>
                        <Button onClick={() => { closeAnchor() }} color="primary" className="mb-2">{i18n.t("CANCEL")}</Button>
                        <Button disabled={dateDisabler && dateDisabler(localDateSelected.selectedDate, config)} onClick={() => {
                            setValue(localDateSelected);
                            closeAnchor();
                        }} color="primary" className="mb-2">{i18n.t("OK")}</Button>
                    </div>
                </Paper>
            </Popover>
        </>
    )
}
