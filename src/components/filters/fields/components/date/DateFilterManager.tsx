import styles from './DateFilterManager.module.css'
import { type DateFilterManagerProps } from '../../../../../types/table/ContentFiltersProps';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createStyles, makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textInput: {
            '& .MuiInputBase-input': {
                padding: 15,
                fontSize: 12
            }
        }
    })
);

const DateFilterManager = (props: DateFilterManagerProps) => {
    const { onChange, value = { startDate: "", endDate: "" }, id } = props;
    const classes = useStyles()

    console.log(value)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={styles.fromToContainer}>
                <div>
                    <DatePicker
                        format="yyyy/MM/dd"
                        label={"From"}
                        className={`${styles.KeyboardDatePicker} ${classes.textInput}`}
                        maxDate={new Date(value?.endDate)}
                        value={(value?.startDate?.length > 0) ? new Date(value?.startDate) : null}
                        onChange={(e) => { onChange(e, id, "DATE", "start"); }}
                    />
                </div>
                <div className={styles.toLabelContainer} />
                <div>
                    <DatePicker
                        format="yyyy/MM/dd"
                        className={`${styles.KeyboardDatePicker} ${classes.textInput}`}
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
