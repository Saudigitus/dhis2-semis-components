import { useRecoilValue } from "recoil"
import { DataStoreState } from "../../schemas/dataStore"


const useDataStoreKey = () => {
    const dataStoreValues = useRecoilValue(DataStoreState)
    const stundetKeys = dataStoreValues?.find((dataStore) => dataStore.key === "student")
    const staffKeys = dataStoreValues?.find((dataStore) => dataStore.key === "staff")

    return { dataStoreValues, stundetKeys, staffKeys }
}

export default useDataStoreKey