import { absentCode, withReason } from "../common/absenceReason"
import { DataValuesProps } from "../../types/api/WithoutRegistrationTypes"
import { attributesProps } from "../../types/api/WithRegistrationTypes"
import { RowsDataProps } from "dhis2-semis-types"
import { type AttendanceFormaterProps } from "../../types/attendance/attendaceFormaterProps"
import { selectedDataStoreKey } from "dhis2-semis-types"

export function attributes(data: attributesProps[]): RowsDataProps {
    const localData: RowsDataProps = {}
    for (const attribute of data || []) {
        localData[attribute.attribute] = attribute.value
    }
    return localData
}

export function dataValues(data: DataValuesProps[], stageId: string): RowsDataProps {
    const localData: RowsDataProps = {}

    for (const dataElement of data || []) {
        localData[`${stageId}.${dataElement.dataElement}`] = dataElement.value
    }
    return localData
}

export function attendanceFormater(events: AttendanceFormaterProps[], attendanceConfig: selectedDataStoreKey['attendance']): RowsDataProps {
    const localData: RowsDataProps = {}
    // An absence is written with its reason ("absent | SICK"); the other options as they are.
    const absent = absentCode(attendanceConfig)
    const reasonElement = (attendanceConfig as any)?.absenceReason

    for (const event of events || []) {
        let status: string = "", reason: string = ""
        for (const dataValue of event?.dataValues || []) {

            if (attendanceConfig?.status === dataValue.dataElement) {
                status = dataValue.value
            }
            if (reasonElement && reasonElement === dataValue.dataElement) reason = dataValue.value
        }

        localData[event.occurredAt?.split("T")?.[0]] = status && status === absent ? withReason(status, reason) : status
    }

    return localData
}



