import { ExportData } from "../../../../types/bulk/bulkOperations"
import { useGetEvents, useUrlParams } from "dhis2-semis-functions";
import { useGetEnrollmentData } from "../../../../hooks/enrollmentDetails/useGetEnrollmentDetails"

export function getCommonSheetData(props: ExportData) {
    const { getEvents } = useGetEvents()
    const { eventFilters = [], selectedSectionDataStore, setProgress = () => { }, onError } = props
    const { getEnrollmentDetails  } = useGetEnrollmentData({ ...props, setProgress })
    const { urlParameters } = useUrlParams()
    const { school: orgUnit } = urlParameters

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
        //verify if events is not empty
        if (!events || events.length === 0) {
            onError('Export Error: No data found')
            return []
        }
        const enrollmentDetails = await getEnrollmentDetails(events)

        return enrollmentDetails
    }

    return { getData }
}