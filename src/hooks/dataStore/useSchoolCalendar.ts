import { useRecoilValue } from "recoil"
import { type schoolCalendarDataStoreRecord } from "../../types/dataStore/schoolCalendar"
import { SchoolCalendarData } from "../../schemas/schoolCalendar"

export const useSchoolCalendar = (): schoolCalendarDataStoreRecord => {
    const schoolCalendar = useRecoilValue(SchoolCalendarData)

    return schoolCalendar as unknown as schoolCalendarDataStoreRecord
}
