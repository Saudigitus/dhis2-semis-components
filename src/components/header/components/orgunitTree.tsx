import { OrganisationUnitTree } from "@dhis2/ui"
import { QueryClient, QueryClientProvider } from "react-query"
import style from "../mainHeader.module.css"

const OrgunitTree = ({roots}:{roots:string[]}) => {
    const queryClient = new QueryClient();

    return (
        <div className={style.OrganisationUnitTreeContainer}>
            <QueryClientProvider client={queryClient}>
                <OrganisationUnitTree  roots={roots} onChange={() => { }} />
            </QueryClientProvider>
        </div>
    )
}

export default OrgunitTree