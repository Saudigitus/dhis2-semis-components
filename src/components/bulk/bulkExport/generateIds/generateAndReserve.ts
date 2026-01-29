import { useDataEngine } from "@dhis2/app-runtime";
import { useGetPatternCodeParams } from "dhis2-semis-functions"

const reserveValuesQuery: any = {
    result: {
        resource: "trackedEntityAttributes",
        id: ({ attributeID }: { attributeID: string }) => `${attributeID}/generateAndReserve`,
        params: ({ params, numberOfReserve }:
            { params: object, numberOfReserve: any }) => ({ ...params, numberToReserve: numberOfReserve })
    }
}
export function generateAndReserveIds() {
    const engine = useDataEngine()
    const { getPatternCodeParams } = useGetPatternCodeParams()

    async function generate({ studentsNumber, attributeID, pattern, orgUnitId, onError }:
        { studentsNumber: number, attributeID: string, pattern: string, orgUnitId: string, onError: (error: any) => void }) {

        const params = await getPatternCodeParams({ orgUnit: orgUnitId, pattern, params: {}, onFail: onError })

        return await engine.query(reserveValuesQuery, {
            variables: {
                params,
                attributeID,
                numberOfReserve: studentsNumber,
            }
        })
    }

    return { generate }
}