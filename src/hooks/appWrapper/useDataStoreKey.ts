import { useRecoilValue } from "recoil"
import { DataStoreState } from "../../schemas/dataStore"


const useDataStoreKey = () => {
    const dataStoreValues = useRecoilValue(DataStoreState)
    return { dataStoreValues }
}

export default useDataStoreKey