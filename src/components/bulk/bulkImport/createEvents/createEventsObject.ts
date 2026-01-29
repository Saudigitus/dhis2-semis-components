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
            if (student[stage.name] && student[stage.name]['enrollmentDate']) {
                enrollmentDate = student[stage.name]['enrollmentDate']
                break;
            }
        }

        let enrolledAtDate = format(new Date(), 'yyyy-MM-dd')

        if (enrollmentDate) {
            try {
                let parsedDate: Date

                if (typeof enrollmentDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(enrollmentDate)) {
                    parsedDate = new Date(enrollmentDate)
                }
                else if (typeof enrollmentDate === 'number') {
                    const excelEpoch = new Date(1899, 11, 30) // Excel's epoch is 1899-12-30
                    parsedDate = new Date(excelEpoch.getTime() + enrollmentDate * 24 * 60 * 60 * 1000)
                }
                else {
                    parsedDate = new Date(enrollmentDate)
                }

                if (!isNaN(parsedDate.getTime())) {
                    enrolledAtDate = format(parsedDate, 'yyyy-MM-dd')
                } else {
                }
            } catch (error) {

            }
        }

        for (const stage of programStages) {
            let dataValues: any = []

            if (
                Object.values(dataStore)?.some((dataStoreKey: any) =>
                    dataStoreKey?.programStage === stage.id || dataStoreKey?.programStages?.includes(stage.id)
                )
            ) {
                if (student[stage.name]) {
                    for (const key of Object.keys(student[stage.name])) {
                        if (student[stage.name][key] && key.split('.')[1]) {
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

                events.push({
                    program: programConfig.id,
                    orgUnit: orgUnit,
                    dataValues: dataValues,
                    status: "ACTIVE",
                    occurredAt: enrolledAtDate,
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
            occurredAt: enrolledAtDate,
            enrolledAt: enrolledAtDate,
            ...(updating ? { enrollment: student.Ids.enrollment } : {})
        })
    }

    return { enrollments }
}

export function generateFinalResultData(
    programStages: string[],
    data: any,
    programConfig: ProgramConfig,
    dataStore: any
) {
    let enrollmentUpdates: any = []

    for (const student of data) {
        if (!student?.Ids || !student?.Ids?.trackedEntity || !student?.Ids?.enrollment || !student?.Ids?.orgUnit) {
            throw new Error('Import error: This operation requires a bulk update file containing (Enrollment, Tracked Entity Id, School UID). Please ensure you are using the bulk update template for final results.');
        }

        const { trackedEntity, enrollment, orgUnit } = student.Ids
        let isDropout = false

        for (const programStage of programStages) {
            for (const key of Object.keys(student[programStage] || {})) {
                const value = student[programStage][key]
                if (value) {
                    if (typeof value === 'string' && dataStore?.finalResult?.dropoutStatusValues?.includes(value)) {
                        isDropout = true
                    }
                }
            }
        }

        enrollmentUpdates.push({
            enrollment,
            program: programConfig.id,
            enrolledAt: format(new Date(), 'yyyy-MM-dd'),
            orgUnit,
            status: isDropout ? 'CANCELLED' : 'COMPLETED',
            trackedEntity,
            occurredAt: format(new Date(), 'yyyy-MM-dd'),
        })
    }

    return { enrollmentUpdates }
}