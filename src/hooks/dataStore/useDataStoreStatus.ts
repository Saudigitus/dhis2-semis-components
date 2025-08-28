import { useRecoilValue } from 'recoil'
import { DataStoreStatusState } from '../../schemas/dataStore'

const useDataStoreStatus = () => {
    const dataStoreStatus = useRecoilValue(DataStoreStatusState)
    return { dataStoreStatus }
}

export { useDataStoreStatus }