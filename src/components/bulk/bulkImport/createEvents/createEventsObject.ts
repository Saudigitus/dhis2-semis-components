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

        // First pass: extract enrollment date from all stages
        for (const stage of programStages) {
            if (student[stage.name] && student[stage.name]['enrollmentDate']) {
                enrollmentDate = student[stage.name]['enrollmentDate']
                break; // Use the first enrollment date found
            }
        }

        // Parse and validate enrollment date before creating events
        let enrolledAtDate = format(new Date(), 'yyyy-MM-dd')
        console.log('🔍 Before parsing - enrollmentDate:', enrollmentDate, 'Type:', typeof enrollmentDate)

        if (enrollmentDate) {
            try {
                // Handle different date formats from Excel
                let parsedDate: Date

                // Check if it's already in YYYY-MM-DD format
                if (typeof enrollmentDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(enrollmentDate)) {
                    parsedDate = new Date(enrollmentDate)
                    console.log('✅ Parsed as YYYY-MM-DD string:', parsedDate)
                }
                // Handle Excel serial date number (days since 1900-01-01)
                else if (typeof enrollmentDate === 'number') {
                    // Excel date serial number conversion
                    const excelEpoch = new Date(1899, 11, 30) // Excel's epoch is 1899-12-30
                    parsedDate = new Date(excelEpoch.getTime() + enrollmentDate * 24 * 60 * 60 * 1000)
                    console.log('✅ Parsed as Excel serial number:', parsedDate)
                }
                // Try parsing as regular date string
                else {
                    parsedDate = new Date(enrollmentDate)
                    console.log('✅ Parsed as date string:', parsedDate)
                }

                // Validate the parsed date
                if (!isNaN(parsedDate.getTime())) {
                    enrolledAtDate = format(parsedDate, 'yyyy-MM-dd')
                    console.log('✅ Final enrolledAt date:', enrolledAtDate)
                } else {
                    console.warn('⚠️ Invalid date after parsing:', parsedDate)
                }
            } catch (error) {
                console.warn('❌ Failed to parse enrollment date:', enrollmentDate, error)
                // Fall back to current date
            }
        } else {
            console.log('⚠️ No enrollment date found, using current date')
        }

        // Now create events with the parsed enrollment date
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

// create a function to generateFinalResultData
export function generateFinalResultData(
    programStages: string[],
    data: any,
    programConfig: ProgramConfig,
    dataStore: any
) {
    let enrollmentUpdates: any = []

    for (const student of data) {
        // Ensure this is a bulk update with Ids provided (trackedEntity, enrollment, orgUnit)
        if (!student?.Ids || !student?.Ids?.trackedEntity || !student?.Ids?.enrollment || !student?.Ids?.orgUnit) {
            throw new Error('Import error: This operation requires a bulk update file containing (Enrollment, Tracked Entity Id, School UID). Please ensure you are using the bulk update template for final results.');
        }

        const { trackedEntity, enrollment, orgUnit } = student.Ids
        let isDropout = false

        for (const programStage of programStages) {
            for (const key of Object.keys(student[programStage] || {})) {
                const value = student[programStage][key]
                if (value) {
                    // Detect "Dropout" in any final-result value (case-insensitive)
                    if (typeof value === 'string' && dataStore?.finalResult?.dropoutStatusValues?.includes(value)) {
                        isDropout = true
                    }
                }
            }
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
        })
    }

    return { enrollmentUpdates }
}