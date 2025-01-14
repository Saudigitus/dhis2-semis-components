import { format } from "date-fns"
import { ProgramConfig } from "../../../../types/programConfig/ProgramConfig"
import { DataStoreRecord } from "../../../../types/dataStore/DataStoreConfig"

export function generateEventObjects(programStages: string[], data: any, programConfig: ProgramConfig) {
    let events: any = []

    for (const student of data) {
        const { trackedEntity, ...rest } = student.Ids

        for (const programStage of programStages) {
            let eventProperties: any = { dataValues: [], program: programConfig.id }
            const programStageID = programConfig.programStages.find(x => x.displayName == programStage)?.id

            for (const key of Object.keys(student[programStage])) {
                if (student[programStage][key]) {
                    eventProperties.dataValues.push({
                        dataElement: key.split('.')[1],
                        value: student[programStage][key]
                    })
                }
            }

            events.push({
                trackedEntityInstance: trackedEntity,
                ...rest,
                ...eventProperties,
                programStage: programStageID,
                occurredAt: format(new Date(), 'yyyy-MM-dd')
            })
        }
    }

    return { events }
}

export function generateAttendanceEventObjects(programStages: string[], data: any, dataStore: DataStoreRecord) {
    let attendanceEvents: any = []

    for (const student of data) {
        const { trackedEntity, ...rest } = student.Ids

        for (const programStage of programStages) {
            for (const key of Object.keys(student[programStage])) {
                if (student[programStage][key]) {
                    attendanceEvents.push({
                        occurredAt: key,
                        trackedEntity,
                        ...rest,
                        program: dataStore.program,
                        programStage: dataStore.attendance.programStage,
                        dataValues: [
                            {
                                dataElement: dataStore.attendance.status,
                                value: student[programStage][key]
                            }
                        ]
                    })
                }
            }
        }
    }

    return { attendanceEvents }
}

export function generateEnrollmentData(profile: string, programConfig: ProgramConfig, stagesToIgnore: string[], data: any, orgUnit: string, updating: boolean) {
    let enrollments: any = []
    const programStages = programConfig.programStages.map((x) => {
        if (!stagesToIgnore.includes(x.id)) return { id: x.id, name: x.displayName }
    }).filter(x => x != undefined)

    for (const student of data) {
        let events: any = [], att: any = [], enrollmentDate: any = null

        for (const stage of programStages) {
            let dataValues: any = []

            if (student[stage.name]) {
                for (const key of Object.keys(student[stage.name])) {
                    if (student[stage.name][key] && key.split('.')[1] || key === 'enrollmentDate') {
                        if (key === 'enrollmentDate') {
                            enrollmentDate = student[stage.name]['enrollmentDate']
                        } else {
                            dataValues = [
                                ...dataValues,
                                {
                                    dataElement: key.split(".")[1],
                                    value: student[stage.name][key]
                                }
                            ]
                        }
                    }
                }
            }

            events.push({
                program: programConfig.id,
                orgUnit: orgUnit,
                dataValues: dataValues,
                status: "ACTIVE",
                occurredAt: format(new Date(), 'yyyy-MM-dd'),
                programStage: stage.id,
                ...(updating ? { trackedEntity: student.Ids.trackedEntity } : {})
            })
        }


        for (const key of Object.keys(student[profile])) {
            if (student[profile][key] && key != 'ref') {
                att = [
                    ...att,
                    {
                        attribute: key,
                        value: student[profile][key]
                    }
                ]
            }
        }

        enrollments.push({
            events: events,
            program: programConfig.id,
            orgUnit: orgUnit,
            status: "COMPLETED",
            attributes: att,
            occurredAt: format(new Date(), 'yyyy-MM-dd'),
            enrolledAt: format(new Date(enrollmentDate), 'yyyy-MM-dd'),
            ...(updating ? { enrollment: student.Ids.enrollment } : {})
        })
    }

    return { enrollments }
}