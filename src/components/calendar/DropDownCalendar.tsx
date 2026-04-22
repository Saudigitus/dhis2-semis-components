import { useState } from 'react'
import Calendar from './Calendar';
import { format } from 'date-fns';
import style from './datepicker.module.css'
import { DropDownCalendarProps } from '../../types/datePicker/CalendarTypes';
import { Button as Dhis2Btn } from "@dhis2/ui";
import { Button, Paper, Popover, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { TranslationState } from '../../schemas/translationsSchema';

export default function DropDownCalendar(props: DropDownCalendarProps) {
    const { setValue, dateDisabler, label, icon, value, config, dataTest } = props
    const [localDateSelected, setlocalDateSelected] = useState<{ selectedDate: Date }>({ selectedDate: new Date() })
    const [anchorCalendar, setAnchorCalendat] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const i18n = useRecoilValue(TranslationState) as any

    const closeAnchor = () => {
        setAnchorCalendat(null);
        setOpen(false);
    };

    return (
        <div data-test={`${dataTest}-container`}>
            <span onClick={(event: any) => { setAnchorCalendat(event.currentTarget), setOpen(true) }}>
                <Dhis2Btn
                    data-test={`${dataTest}-btn`}
                    icon={icon}
                >
                    {label}
                </Dhis2Btn>
            </span>

            <Popover
                open={open}
                anchorEl={anchorCalendar}
                data-test={`${dataTest}-popover`}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Paper>
                    <div className={style.datepickerTypography}>
                        <Typography variant="overline">{i18n.t("SELECT DATE")}</Typography>
                        <Typography variant="h4" className="mt-2">{format(new Date(localDateSelected.selectedDate), "E, MMM dd - YYY")}</Typography>
                    </div>
                    <Calendar dataTest={dataTest} config={config} dateDisabler={dateDisabler} setValue={setlocalDateSelected} value={localDateSelected} />
                    <div className={style.datepickerButtons}>
                        <Button onClick={() => { closeAnchor() }} color="primary" className="mb-2">{i18n.t("CANCEL")}</Button>
                        <Button disabled={dateDisabler && dateDisabler(localDateSelected.selectedDate, config)} onClick={() => {
                            setValue(localDateSelected);
                            closeAnchor();
                        }} color="primary" className="mb-2">{i18n.t("OK")}</Button>
                    </div>
                </Paper>
            </Popover>
        </div>
    )
}
