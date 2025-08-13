import { atom } from "recoil";
import { schoolCalendarDataStoreRecord } from "../types/dataStore/schoolCalendar";

export const SchoolCalendarData = atom<schoolCalendarDataStoreRecord>({
    key: "school-calendar-data-store-state",
    default: undefined
})