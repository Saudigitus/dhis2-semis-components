import { useDataMutation } from '@dhis2/app-runtime'
import useDataStore from './useDataStore';
import useShowAlerts from '../common/useShowAlert';

export function useCreateDsDir({ keySpace, setLoading }: { keySpace: string, setLoading: (args: boolean) => void }) {
    const { hide, show } = useShowAlerts()
    const { error, getDataStore } = useDataStore({ keySpace, setLoading });

    const [mutate] = useDataMutation({
        resource: `${keySpace}`,
        data: () => [],
        type: 'create'
    },
        {
            onError(error) {
                show({
                    message: `Could not get data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            },
            onComplete: async (data) => {
                await getDataStore(false)
                setLoading(false)
            }
        }
    )



    return { createDir: mutate, error }
}