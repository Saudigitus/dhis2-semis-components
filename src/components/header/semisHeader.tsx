import { SemisHeaderProps } from "../../types/header/headerTypes"
import HeaderItem from "./components/headerItem"

const SemisHeader = ({ headerItems }: { headerItems: SemisHeaderProps }) => {
    const { grades, classes, academicYears,orgunits } = headerItems;
    return (
        <>
            <HeaderItem headerItem={
                {
                    label: "School",
                    searchInputPlaceholder: "Search for a school",
                    valuePlaceholder: "Select a school",
                    options: orgunits?.options
                }
            } />
            <HeaderItem headerItem={
                {
                    label: "Grade",
                    searchInputPlaceholder: "Search for a grade",
                    valuePlaceholder: "Select a grade",
                    options: grades?.options
                }
            } />
            <HeaderItem headerItem={
                {
                    label: "Class",
                    searchInputPlaceholder: "Search for a class",
                    valuePlaceholder: "Select a class",
                    options: classes?.options
                }
            } />
            <div style={{ marginLeft: "auto" }}>
                <HeaderItem headerItem={
                    {
                        label: "Academic year",
                        valuePlaceholder: "Select a academic year",
                        options: academicYears?.options,
                        isSeachable: false
                    }
                } />
            </div>
        </>
    )
}

export default SemisHeader