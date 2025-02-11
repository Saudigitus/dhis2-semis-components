import { useDataEngine } from "@dhis2/app-runtime";
import { type TeiQueryResults, type TeiQueryProps } from "../../types/api/WithRegistrationTypes";

const TEI_QUERY = (queryProps: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            ...queryProps
        }
    }
})

export function useGetTei() {
    const engine = useDataEngine();

    async function getTei(program: string, trackedEntity: string[], orgUnit: string) {
        return await engine.query(TEI_QUERY({
            paging: false,
            program: program,
            trackedEntity: trackedEntity,
            fields: "trackedEntity,occuredAt,createdAt,orgUnit,attributes[attribute,value]",
            orgUnit
        })) as unknown as TeiQueryResults
    }

    async function getTeiSearch(program: string, filters: string, orgUnit: string) {
        return await engine.query(TEI_QUERY({
            pageSize: 5,
            page: 1,
            program,
            filter: filters.slice(0, -1),
            orgUnit,
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,enrolledAt],programOwners[orgUnit]"
        }),
        );

    }

    return { getTei, getTeiSearch }
}