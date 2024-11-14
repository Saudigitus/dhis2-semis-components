import { SemisHeaderProps } from "../../types/header/headerTypes"
import HeaderItem from "./components/headerItem"
import OrgunitTree from "./components/orgunitTree";

const SemisHeader = ({ headerItems }: { headerItems: SemisHeaderProps }) => {
    const { academicYears, orgunits, restItems = [] } = headerItems;


    return (
        <>
            {orgunits && <HeaderItem headerItem={
                {
                    label: "School",
                    searchInputPlaceholder: "Search for a school",
                    valuePlaceholder: "Select a school",
                    customComponent: <OrgunitTree roots={orgunits.roots} />
                }
            } />}
            {
                restItems.map((header) => (
                    <HeaderItem headerItem={{
                        options: header.options,
                        label: header?.dataElement?.displayName,
                        searchInputPlaceholder: `Search for a ${header?.dataElement?.displayName}`,
                        valuePlaceholder: `Select a ${header?.dataElement?.displayName}`,
                    }} />
                ))
            }
            {academicYears && <div style={{ marginLeft: "auto" }}>
                <HeaderItem headerItem={
                    {
                        label: "Academic year",
                        valuePlaceholder: "Select a academic year",
                        options: academicYears?.options,
                        isSeachable: false
                    }
                } />
            </div>}
        </>
    )
}

export default SemisHeader