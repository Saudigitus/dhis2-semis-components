import styles from './DateFilterManager.module.css'
import { type DateFilterManagerProps } from '../../../../../types/table/ContentFiltersProps';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DateFilterManager = (props: DateFilterManagerProps) => {
    const { onChange, value = { startDate: "", endDate: "" }, id } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={styles.fromToContainer}>
                <div>
                    <DatePicker
                        format="yyyy/MM/dd"
                        label={"From"}
                        className={styles.KeyboardDatePicker}
                        maxDate={new Date(value?.endDate)}
                        value={(value?.startDate?.length > 0) ? new Date(value?.startDate) : null}
                        onChange={(e) => { onChange(e, id, "DATE", "start"); }}
                    />
                </div>
                <div className={styles.toLabelContainer} />
                <div>
                    <DatePicker
                        format="yyyy/MM/dd"
                        className={styles.KeyboardDatePicker}
                        minDate={new Date(value?.startDate)}
                        label={"To"}
                        value={((value?.endDate)?.length > 0) ? new Date(value?.endDate) : null}
                        onChange={(e) => { onChange(e, id, "DATE", "end"); }}
                    />
                </div>
            </div>
        </LocalizationProvider>

    );
}

export default DateFilterManager
