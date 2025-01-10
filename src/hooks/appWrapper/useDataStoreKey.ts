import { useRecoilValue } from "recoil"
import { DataStoreState } from "../../schemas/dataStore"


const useDataStoreKey = ({ sectionType }: { sectionType: string }) => {
    const dataStoreValues = useRecoilValue(DataStoreState)
    const dataStoreKeyValues = dataStoreValues?.find((dataStore) => dataStore.key === sectionType)

    return { dataStoreKeyValues }
}

export default useDataStoreKey