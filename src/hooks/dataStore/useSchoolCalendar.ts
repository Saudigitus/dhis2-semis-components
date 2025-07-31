import { useRecoilValue } from "recoil"
import { type dataStoreRecord } from "../../types/dataStore/schoolCalendar"
import { SchoolCalendarData } from "../../schemas/schoolCalendar"

export const useSchoolCalendar = (): dataStoreRecord => {
    const schoolCalendar = useRecoilValue(SchoolCalendarData)

    return schoolCalendar as unknown as dataStoreRecord
}
