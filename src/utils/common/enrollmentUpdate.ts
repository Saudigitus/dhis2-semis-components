// "Update existing students / staffs": the update of one existing enrollment built from a row of the
// file, keeping on the server what the user did not change (dates, school, status of the records).

type ServerEvent = { event: string, programStage: string, orgUnit?: string, occurredAt?: string, status?: string }
type ServerEnrollment = { enrollment: string, enrolledAt?: string, occurredAt?: string, orgUnit?: string, status?: string }

const day = (value?: string) => value ? String(value).slice(0, 10) : undefined

// "row": the enrollment built from the file ({ enrolledAt, attributes, events: [{ programStage, dataValues }], ... }).
// The enrollment date of the file is the date of the registration record (as exported): when it is
// the same as on the server, the dates of the server are kept; when the user changed it, the new date
// is saved on the enrollment and on the registration record. Other records keep their date.
export function buildEnrollmentUpdate(
    row: any,
    server: { enrollment?: ServerEnrollment, events: ServerEvent[] },
    registrationStage: string,
    ids: { trackedEntity: string, orgUnit: string },
    trackedEntityType: string
) {
    const { attributes, events = [], ...enrollment } = row
    const fileDate = day(row?.enrolledAt)
    const registration = server.events.find(x => x.programStage === registrationStage)
    const dateChanged = Boolean(registration && fileDate && fileDate !== day(registration.occurredAt))

    return {
        trackedEntity: ids.trackedEntity,
        orgUnit: ids.orgUnit,
        trackedEntityType,
        attributes,
        enrollments: [{
            ...enrollment,
            orgUnit: server.enrollment?.orgUnit ?? enrollment.orgUnit,
            // SEMIS keeps enrollments COMPLETED or CANCELLED: a cancelled enrollment (dropout) stays
            // cancelled, any other one is sent COMPLETED, as before.
            status: server.enrollment?.status === "CANCELLED" ? "CANCELLED" : enrollment.status,
            enrolledAt: dateChanged ? fileDate : (server.enrollment?.enrolledAt ?? enrollment.enrolledAt),
            occurredAt: dateChanged ? fileDate : (server.enrollment?.occurredAt ?? enrollment.occurredAt),
            // Only records that already exist are updated (same as before for socio-economics).
            events: events
                .map((event: any) => {
                    const existing = server.events.find(x => x.programStage === event.programStage)
                    if (!existing) return null
                    return {
                        ...event,
                        event: existing.event,
                        orgUnit: existing.orgUnit ?? event.orgUnit,
                        status: existing.status ?? event.status,
                        occurredAt: event.programStage === registrationStage && dateChanged ? fileDate : existing.occurredAt,
                    }
                })
                .filter(Boolean)
        }]
    }
}
