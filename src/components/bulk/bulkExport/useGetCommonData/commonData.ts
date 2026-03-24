import { ExportData } from "../../../../types/bulk/bulkOperations"
import { useGetEvents, useUrlParams } from "dhis2-semis-functions";
import { useGetEnrollmentData } from "../../../../hooks/enrollmentDetails/useGetEnrollmentDetails"

export function getCommonSheetData(props: ExportData) {
    const { getEvents } = useGetEvents()
    const { eventFilters = [], selectedSectionDataStore, setProgress = () => { }, onError } = props
    const { getEnrollmentDetails } = useGetEnrollmentData({ ...props, setProgress })
    const { urlParameters } = useUrlParams()
    const { school: orgUnit } = urlParameters

    async function getData() {
        let events = [], page = 1, pageSize = 50, fetchedEvents = []
        do {
            events = await getEvents({
                program: selectedSectionDataStore?.program as unknown as string,
                programStage: selectedSectionDataStore?.registration.programStage,
                fields: "trackedEntity,enrollment,orgUnit,program",
                filter: eventFilters,
                orgUnit,
                pageSize,
                page,
                orgUnitMode: 'SELECTED',
                order: selectedSectionDataStore?.defaults?.defaultOrder
            }).catch((error) => {
                setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
                onError('Export Error: ' + error)
            })

            fetchedEvents = [...fetchedEvents, ...events]
            page++
        } while (events?.length === pageSize)

        setProgress((prev: any) => ({ ...prev, progress: 10, buffer: 16 }))
        //verify if events is not empty
        if (fetchedEvents.length === 0) {
            return []
        }
        const enrollmentDetails = await getEnrollmentDetails(fetchedEvents)

        return enrollmentDetails
    }

    return { getData }
}