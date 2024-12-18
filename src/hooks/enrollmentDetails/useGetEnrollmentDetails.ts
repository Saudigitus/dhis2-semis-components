import { useState } from 'react'
import { useGetEvents } from '../events/useGetEvents';
import { ExportData } from '../../types/bulk/bulkOperations';
import { attributes, dataValues } from '../../utils/format/formatData';
import { modules } from '../../types/common/moduleTypes';
import { format } from 'date-fns';
import { useGetTei } from '../tei/useGetTei';
import useShowAlerts from '../common/useShowAlert';

export function useGetEnrollmentData(props: ExportData) {
    const { getTei } = useGetTei()
    const { getEvents } = useGetEvents()
    const { orgUnitName, orgUnit, eventFilters, withSocioEconomics, selectedSectionDataStore, module, setProgress = () => { } } = props
    const { hide, show } = useShowAlerts()

    const getEnrollmentDetails = async (events: any) => {
        const percentagem = module === modules.enrollment ? 80 : 40
        const trackedEntityIds = events?.map((x: { trackedEntity: string }) => x.trackedEntity).join(';')

        try {
            return getTei(selectedSectionDataStore?.program as unknown as string, trackedEntityIds)
                .then(async (trackedEntityInstance: any) => {
                    let rows: any = []
                    let counter = 0

                    for (const tei of trackedEntityInstance?.results?.instances) {
                        counter++
                        let enrollment = events.find((x: any) => x.trackedEntity == tei?.trackedEntity)?.enrollment
                        let socioEconomiscData: any = []

                        const registrationData: any = await getEvents({
                            program: selectedSectionDataStore?.program as unknown as string,
                            programStage: selectedSectionDataStore?.registration.programStage as unknown as string,
                            ouMode: "SELECTED",
                            fields: "*",
                            filter: eventFilters,
                            skipPaging: true,
                            trackedEntity: tei.trackedEntity,
                            orgUnit: orgUnit
                        })

                        if (withSocioEconomics || module === modules.enrollment) {
                            socioEconomiscData = await getEvents({
                                program: selectedSectionDataStore?.program as unknown as string,
                                programStage: selectedSectionDataStore?.['socio-economics'].programStage as unknown as string,
                                ouMode: "SELECTED",
                                fields: "*",
                                filter: eventFilters,
                                skipPaging: true,
                                trackedEntity: tei.trackedEntity,
                                orgUnit: orgUnit
                            })
                        }

                        const currEnrollmentRegistration = registrationData?.find((x: any) => x.enrollment === enrollment)
                        const currEnrollmentSocioEconomics = socioEconomiscData?.find((x: any) => x.enrollment === enrollment)

                        rows = [...rows, {
                            ref: "" + counter + " ",
                            school: orgUnitName,
                            orgUnit: currEnrollmentRegistration?.orgUnit,
                            enrollmentDate: format(new Date(currEnrollmentRegistration?.occurredAt), 'yyyy-MM-dd'),
                            enrollment: enrollment,
                            trackedEntity: tei.trackedEntity,
                            ...attributes(tei?.attributes ?? []),
                            ...dataValues(currEnrollmentRegistration?.dataValues ?? [], selectedSectionDataStore?.registration.programStage as unknown as string),
                            ...dataValues(currEnrollmentSocioEconomics?.dataValues ?? [], selectedSectionDataStore?.['socio-economics'].programStage as unknown as string),
                        }]

                        setProgress((progress: any) => ({
                            ...progress,
                            progress: progress.progress + (percentagem / trackedEntityInstance?.results?.instances?.length),
                            buffer: progress.buffer + ((percentagem + 4) / trackedEntityInstance.results?.instances?.length)
                        }))
                    }

                    return rows
                })
        }
        catch (error: any) {
            show({ message: `Export error: ${error}`, type: { critical: true } })
            setTimeout(hide, 5000);
            setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
        }

    }

    return { getEnrollmentDetails }
}