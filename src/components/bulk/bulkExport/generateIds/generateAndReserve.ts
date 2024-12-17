import { useDataEngine } from "@dhis2/app-runtime";

const reserveValuesQuery: any = {
    result: {
        resource: "trackedEntityAttributes",
        id: ({
            numberOfReserve,
            attributeID
        }: {
            numberOfReserve: number,
            attributeID: string
        }) => `${attributeID}/generateAndReserve?numberToReserve=${numberOfReserve}`,
    }
}
export function generateAndReserveIds() {
    const engine = useDataEngine()

    async function generate(studentsNumber: number, id: string) {
        return await engine.query(reserveValuesQuery, {
            variables: {
                numberOfReserve: studentsNumber,
                attributeID: id
            }
        })
    }

    return { generate }
}