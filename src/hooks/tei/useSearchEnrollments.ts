import { useState } from 'react'
import { useGetEvents } from '../events/useGetEvents';
import useShowAlerts from '../common/useShowAlert';
import { formatResponseData } from '../../utils/tei/formatResponseData';
import { useGetTei } from './useGetTei';
import { attributes } from '../../utils/format/formatData';
import { useDataStoreKey } from 'dhis2-semis-functions'

export default function useSearchEnrollments({ sectionType }: { sectionType: "staff" | "student" }) {
    const { getTeiSearch } = useGetTei()
    const { getEvents } = useGetEvents()
    const { show } = useShowAlerts()
    const { registration, program, "socio-economics": socioEconomics } = useDataStoreKey({ sectionType: sectionType })
    const [enrollmentValues, setEnrollmentValues] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [totalResults, setTotalResults] = useState<any>(null);

    const getEnrollmentsData = (filters: string, setShowResults: any) => {
        const teisWithRegistrationEvents: any[] = [];
        const fields: string = "event,trackedEntity,enrollment,occurredAt,dataValues[dataElement,value],orgUnitName,orgUnit"
        setLoading(true)
        getTeiSearch(program, filters)
            .then(async (teiResponse: any) => {

                for (const tei of teiResponse?.results?.instances) {
                    let socioEconomicsResponse: any = {}

                    const registrationResponse = await getEvents({
                        program, programStage: registration.programStage as unknown as string, trackedEntity: tei?.trackedEntity, fields
                    })

                    if (socioEconomics)
                        socioEconomicsResponse = await getEvents({
                            program, programStage: socioEconomics.programStage as unknown as string, trackedEntity: tei?.trackedEntity, fields
                        })


                    const registrationEvents = formatResponseData("WITHOUT_REGISTRATION", registrationResponse?.results?.instances)
                    const socioEconomicsEvents = formatResponseData("WITHOUT_REGISTRATION", socioEconomicsResponse?.results?.instances)
                    teisWithRegistrationEvents.push({ ...tei, ownershipOu: tei?.programOwners?.[0]?.orgUnit, enrollmentsNumber: registrationEvents?.length, registrationEvents, socioEconomicsEvents, mainAttributesFormatted: attributes(tei?.attributes), ...attributes(tei?.attributes) })
                }

                setEnrollmentValues(teisWithRegistrationEvents)
                setLoading(false)
                setShowResults(true)
                setTotalResults(teiResponse.results.total || 0);
            })
            .catch((error: any) => {
                setLoading(false)
                setError(true)
                show({
                    message: `${("Could not get selected enrollment details")}: ${error.message}`,
                    type: { critical: true }
                });
            })
    }

    return { enrollmentValues, setEnrollmentValues, getEnrollmentsData, loading, error, totalResults }
}