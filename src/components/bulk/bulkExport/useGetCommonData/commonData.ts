import { ExportData } from "../../../../types/bulk/bulkOperations"
import { useGetEvents } from "../../../../hooks/events/useGetEvents"
import { useGetEnrollmentData } from "../../../../hooks/enrollmentDetails/useGetEnrollmentDetails"

export function getCommonSheetData(props: ExportData) {
    const { getEvents } = useGetEvents()
    const { orgUnit, eventFilters = [], selectedSectionDataStore, setProgress = () => { }, onError } = props
    const { getEnrollmentDetails } = useGetEnrollmentData({ ...props, setProgress })

    async function getData() {
        const events = await getEvents({
            program: selectedSectionDataStore?.program as unknown as string,
            programStage: selectedSectionDataStore?.registration.programStage,
            fields: "trackedEntity,enrollment,orgUnit,program",
            filter: eventFilters,
            orgUnit,
            skipPaging: true,
            ouMode: 'SELECTED',
            order: selectedSectionDataStore?.defaults.defaultOrder
        }).catch((error) => {
            setProgress((progress: any) => ({ ...progress, progress: 100, buffer: 100 }))
            onError('Export Error: ' + error)
        })

        setProgress((prev: any) => ({ ...prev, progress: 10, buffer: 16 }))
        const enrollmentDetails = await getEnrollmentDetails(events)

        return enrollmentDetails
    }

    return { getData }
}