import { useRecoilValue } from "recoil"
import { type selectedDataStoreKey } from 'dhis2-semis-types'
import { DataStoreState } from "../../schemas/dataStore"

export const useDataStoreKey = ({ sectionType }: { sectionType: "student" | "staff" }): selectedDataStoreKey => {
    const dataStoreValues = useRecoilValue(DataStoreState)
    const dataStoreKeyValues = dataStoreValues?.find((dataStore) => dataStore.key === sectionType)
    return dataStoreKeyValues as unknown as selectedDataStoreKey
}
