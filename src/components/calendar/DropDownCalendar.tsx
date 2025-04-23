import { useState } from 'react'
import Calendar from './Calendar';
import { format } from 'date-fns';
import style from './datepicker.module.css'
import { Popover, Typography, Paper, Button } from '@material-ui/core';
import { DropDownCalendarProps } from '../../types/datePicker/CalendarTypes';
import { Button as Dhis2Btn } from "@dhis2/ui";

export default function DropDownCalendar(props: DropDownCalendarProps) {
    const { setValue, dateDisabler, label, icon, value, config } = props
    const [localDateSelected, setlocalDateSelected] = useState<{ selectedDate: Date }>({ selectedDate: new Date() })
    const [anchorCalendar, setAnchorCalendat] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(false);

    const closeAnchor = () => {
        setAnchorCalendat(null);
        setOpen(false);
    };

    return (
        <>
            <Dhis2Btn
                onClick={(event: any) => { setAnchorCalendat(event.currentTarget), setOpen(true) }}
                icon={icon}
            >{label}
            </Dhis2Btn>
            <Popover
                open={open}
                anchorEl={anchorCalendar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Paper>
                    <div className={style.datepickerTypography}>
                        <Typography variant="overline">SELECT DATE</Typography>
                        <Typography variant="h4" className="mt-2">{format(new Date(localDateSelected.selectedDate), "E, MMM dd - YYY")}</Typography>
                    </div>
                    <Calendar config={config} dateDisabler={dateDisabler} setValue={setlocalDateSelected} value={localDateSelected} />
                    <div className={style.datepickerButtons}>
                        <Button onClick={() => { closeAnchor() }} color="primary" className="mb-2">CANCEL</Button>
                        <Button disabled={dateDisabler && dateDisabler(localDateSelected.selectedDate, config)} onClick={() => {
                            setValue(localDateSelected);
                            closeAnchor();
                        }} color="primary" className="mb-2">OK</Button>
                    </div>
                </Paper>
            </Popover>
        </>
    )
}
