import { useRecoilValue } from "recoil"
import { SchoolCalendarData } from "../../schemas/schoolCalendar"
import { schoolCalendarDataStoreRecord } from "../../types/dataStore/schoolCalendar"

const useSchoolCalendarKey = () => {
    const schoolCalendar = useRecoilValue(SchoolCalendarData)
    return schoolCalendar as unknown as schoolCalendarDataStoreRecord

}

export { useSchoolCalendarKey }