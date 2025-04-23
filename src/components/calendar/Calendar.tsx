import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { CalendarProps } from '../../types/datePicker/CalendarTypes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Calendar(props: CalendarProps) {
  const { value, setValue, dateDisabler } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar
        value={value.selectedDate}
        onChange={(e: any) => { setValue({ selectedDate: e as Date }) }}
        shouldDisableDate={(date: any) => !!(dateDisabler && dateDisabler(date))}
      />
    </LocalizationProvider>
  );
}
