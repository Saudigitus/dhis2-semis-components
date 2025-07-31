import { atom } from "recoil";
import { dataStoreRecord } from "../types/dataStore/schoolCalendar";

export const SchoolCalendarData = atom<dataStoreRecord>({
    key: "school-calendar-data-store-state",
    default: undefined
})