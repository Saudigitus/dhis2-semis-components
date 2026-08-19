import { useEffect, useRef, useState } from 'react'
import Calendar from './Calendar';
import { format } from 'date-fns';
import style from './datepicker.module.css'
import { DropDownCalendarProps } from '../../types/datePicker/CalendarTypes';
import { Button as Dhis2Btn } from "@dhis2/ui";
import { Button, Chip, Paper, Popover, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { TranslationState } from '../../schemas/translationsSchema';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function DropDownCalendar(props: DropDownCalendarProps) {
    const { setValue, dateDisabler, label, icon, value, config, onCancel, showSelected = false } = props
    const [localDateSelected, setlocalDateSelected] = useState<{ selectedDate: Date }>({ selectedDate: new Date() })
    const [anchorCalendar, setAnchorCalendat] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [showSelectedChip, setShowSelectedChip] = useState<boolean>(false);
    const i18n = useRecoilValue(TranslationState) as any
    const ref = useRef<any>(null)
    const showInput = showSelected ? !showSelectedChip : true

    useEffect(() => {
        setShowSelectedChip((!!value?.selectedDate || !!value))
    }, [value])

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
                    <Calendar config={config} dateDisabler={dateDisabler} setValue={setlocalDateSelected} value={localDateSelected} />
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
