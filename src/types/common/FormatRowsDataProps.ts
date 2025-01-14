import { DataValuesProps } from "../api/WithoutRegistrationTypes"
import { dataValuesProps } from "../events/eventsProps"
import { attributesProps } from "../tei/teiProps"

interface FormatResponseRowsProps {
    registrationInstances?: {
        trackedEntity: string
        dataValues: dataValuesProps[]
        enrollment: string
        event?: string
        occurredAt?: string
        isRegistrationEvent?: boolean
    }[]
    teiInstances?: {
        trackedEntity: string
        attributes: attributesProps[]
        enrollments: {
            enrollment: string
            orgUnit: string
            program: string
            status: string
        }[]
        createdAt: string
        programOwners: {
            orgUnit: string
        }[]
    }[]
    socioEconInstances?: {
        trackedEntity: string
        dataValues: dataValuesProps[]
        enrollment: string
        event?: string
        occurredAt?: string
        isRegistrationEvent?: boolean
    }[]
    attendanceInstances?: {
        trackedEntity: string
        dataValues: DataValuesProps[]
        enrollment: string
        event?: string
        occurredAt?: string
        isRegistrationEvent?: boolean
    }[]
    additionalInstances?: any[]
}

type RowsDataProps = Record<string, string | number | boolean | any>;

export type { FormatResponseRowsProps, RowsDataProps }
