import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import styles from './DateFilterManager.module.css'
import { type DateFilterManagerProps } from '../../../../../types/table/ContentFiltersProps';

const DateFilterManager = (props: DateFilterManagerProps) => {
    const { onChange, value = { startDate: "", endDate: "" }, id } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={styles.fromToContainer}>
                <div>
                    <KeyboardDatePicker
                        variant="inline"
                        format="yyyy/MM/dd"
                        label={"From"}
                        className={styles.KeyboardDatePicker}
                        maxDate={value?.endDate}
                        value={(value?.startDate?.length > 0) ? value?.startDate : null}
                        onChange={(e) => { onChange(e, id, "DATE", "start"); }}
                    />
                </div>
                <div className={styles.toLabelContainer} />
                <div>
                    <KeyboardDatePicker
                        variant="inline"
                        format="yyyy/MM/dd"
                        className={styles.KeyboardDatePicker}
                        minDate={value?.startDate}
                        label={"To"}
                        value={((value?.endDate)?.length > 0) ? value?.endDate : null}
                        onChange={(e) => { onChange(e, id, "DATE", "end"); }}
                    />
                </div>
            </div>
        </MuiPickersUtilsProvider>

    );
}

export default DateFilterManager
