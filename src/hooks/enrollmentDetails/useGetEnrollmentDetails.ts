import { format } from 'date-fns';
import { Modules } from 'dhis2-semis-types';
import { ExportData } from '../../types/bulk/bulkOperations';
import { attributes, dataValues } from '../../utils/format/formatData';
import { chunkList, groupByEnrollment, readEventsByEnrollments } from '../../utils/common/eventsByEnrollment';
import { useGetEvents, useGetTeis, useUrlParams } from "dhis2-semis-functions";

export function useGetEnrollmentData(props: ExportData) {
    const { getTeis } = useGetTeis()
    const { getEvents } = useGetEvents()
    const { onError, withSocioEconomics, selectedSectionDataStore, module, setProgress = () => { } } = props
    const { urlParameters } = useUrlParams()
    const { schoolName: orgUnitName, school: orgUnit, } = urlParameters

    // "data": the registration records of the class, read with the class filters. They are the
    // base of the file: one row per registration, joined by enrollment with the other records.
    const getEnrollmentDetails = async (data: any) => {
        const percentagem = module === Modules.Enrollment ? 80 : 40
        const program = selectedSectionDataStore?.program as unknown as string
        const registrationStage = selectedSectionDataStore?.registration?.programStage as unknown as string
        const socioEconomicsStage = selectedSectionDataStore?.['socio-economics']?.programStage as unknown as string

        try {
            const registrations: any[] = [...new Map((data ?? []).map((x: any) => [x.enrollment, x])).values()]

            // Profiles: a few requests for the whole class.
            const trackedEntityIds = [...new Set(registrations.map((x: any) => x.trackedEntity))] as string[]
            const trackedEntities: Record<string, any> = {}
            for (const ids of chunkList(trackedEntityIds))
                for (const tei of (await getTeis({ program, trackedEntities: ids.join(','), orgUnitMode: "ACCESSIBLE" }) ?? []))
                    trackedEntities[tei.trackedEntity] = tei

            setProgress((progress: any) => ({ ...progress, progress: progress.progress + percentagem / 2, buffer: progress.buffer + (percentagem + 4) / 2 }))

            // The socio-economics (students) / Teacher Detail (staff) record is read by enrollment,
            // without the class filters: those values exist only on the registration record.
            const socioEconomics = socioEconomicsStage && (withSocioEconomics || module === Modules.Enrollment)
                ? groupByEnrollment(await readEventsByEnrollments(getEvents, {
                    program,
                    programStage: socioEconomicsStage,
                    orgUnitMode: "SELECTED",
                    orgUnit,
                    fields: "event,enrollment,dataValues[dataElement,value]"
                }, registrations.map((x: any) => x.enrollment)))
                : {}

            setProgress((progress: any) => ({ ...progress, progress: progress.progress + percentagem / 2, buffer: progress.buffer + (percentagem + 4) / 2 }))

            let counter = 0
            return registrations
                .filter((registration: any) => trackedEntities[registration.trackedEntity])
                .map((registration: any) => {
                    const tei = trackedEntities[registration.trackedEntity]
                    counter++

                    return {
                        ref: "" + counter + " ",
                        school: orgUnitName,
                        orgUnit: registration?.orgUnit,
                        enrollmentDate: registration?.occurredAt ? format(new Date(registration?.occurredAt), 'yyyy-MM-dd') : "",
                        enrollment: registration.enrollment,
                        trackedEntity: tei.trackedEntity,
                        enrollmentStatus: tei?.enrollments?.find((x: any) => x.enrollment === registration.enrollment)?.status,
                        ...attributes(tei?.attributes ?? []),
                        ...dataValues(registration?.dataValues ?? [], registrationStage),
                        ...(socioEconomicsStage ? dataValues(socioEconomics?.[registration.enrollment]?.[0]?.dataValues ?? [], socioEconomicsStage) : {}),
                    }
                })
        }
        catch (error: any) {
            onError('Export Error: ' + error)
            setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
        }
    }

    return { getEnrollmentDetails }
}
