import { format } from "date-fns"
import { selectedDataStoreKey, ProgramConfig } from 'dhis2-semis-types';

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

export function generateAttendanceEventObjects(programStages: string[], data: any, dataStore: selectedDataStoreKey) {
    let attendanceEvents: any = []

    for (const student of data) {
        //show errror if not provide a correct file to import attendance
        if (!student?.Ids || !student?.Ids?.trackedEntity || !student?.Ids?.orgUnit) {
            throw new Error('Import error: This operation requires a bulk update file containing (Tracked Entity Id, School UID). Please ensure you are using the bulk attendance file.');
        }
        const { trackedEntity, ...rest } = student?.Ids

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

export function generateEnrollmentData(profile: string, programConfig: ProgramConfig, stagesToIgnore: string[], data: any, orgUnit: string, updating: boolean, dataStore: selectedDataStoreKey) {
    let enrollments: any = []
    const programStages = programConfig?.programStages.map((x) => {
        if (!stagesToIgnore.includes(x.id)) return { id: x.id, name: x.displayName }
    }).filter(x => x != undefined)

    for (const student of data) {
        if (updating && (!student?.Ids || !student?.Ids?.enrollment || !student?.Ids?.trackedEntity || !student?.Ids?.orgUnit)) {
            throw new Error('Import error: This operation requires a bulk update file containing (Enrollment, Tracked Entity Id, School UID). Please ensure you are using the bulk update template.');
        }
        let events: any = [], att: any = [], enrollmentDate: any = null

        for (const stage of programStages) {
            let dataValues: any = []

            if (
                Object.values(dataStore)?.some((dataStoreKey: any) =>
                    dataStoreKey?.programStage === stage.id || dataStoreKey?.programStages?.includes(stage.id)
                )
            ) {
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
                    ...(updating ? { trackedEntity: student?.Ids?.trackedEntity } : {})
                })
            }
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

// create a function to generateFinalResultData
export function generateFinalResultData(
    programStages: string[],
    data: any,
    programConfig: ProgramConfig
) {
    let enrollmentUpdates: any = []

    for (const student of data) {
        let finalResultEvents: any = []
        // Ensure this is a bulk update with Ids provided (trackedEntity, enrollment, orgUnit)
        if (!student?.Ids || !student?.Ids?.trackedEntity || !student?.Ids?.enrollment || !student?.Ids?.orgUnit) {
            throw new Error('Import error: This operation requires a bulk update file containing (Enrollment, Tracked Entity Id, School UID). Please ensure you are using the bulk update template for final results.');
        }

        const { trackedEntity, enrollment, orgUnit, ...rest } = student.Ids
        let isDropout = false

        for (const programStage of programStages) {
            let eventId = ""
            let eventProperties: any = { dataValues: [], program: programConfig.id }
            const programStageID = programConfig.programStages.find(x => x.displayName == programStage)?.id
            for (const key of Object.keys(student[programStage] || {})) {
                const value = student[programStage][key]
                if (value) {
                    eventId = key.split('.')[0]
                    eventProperties.dataValues.push({
                        dataElement: key.split('.')[1],
                        value: value
                    })

                    // Detect "Dropout" in any final-result value (case-insensitive)
                    if (typeof value === 'string' && value.trim().toLowerCase() === 'dropout') {
                        isDropout = true
                    }
                }
            }

            finalResultEvents.push({
                event: eventId,
                orgUnit,
                trackedEntityInstance: trackedEntity,
                ...rest,
                ...eventProperties,
                programStage: programStageID,
                occurredAt: format(new Date(), 'yyyy-MM-dd')
            })
        }

        // Build enrollment update payload (CANCELLED for dropout, COMPLETED otherwise)
        enrollmentUpdates.push({
            enrollment,
            program: programConfig.id,
            enrolledAt: format(new Date(), 'yyyy-MM-dd'),
            orgUnit,
            status: isDropout ? 'CANCELLED' : 'COMPLETED',
            trackedEntity,
            occurredAt: format(new Date(), 'yyyy-MM-dd'),
            events: finalResultEvents
        })
    }

    return { enrollmentUpdates }
}