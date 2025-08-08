import { useDataMutation } from '@dhis2/app-runtime'
import useDataStore from './useDataStore';
import useShowAlerts from '../common/useShowAlert';
import { useState } from 'react';

export function useCreateDsDir({ keySpace }: { keySpace: string }) {
    const { hide, show } = useShowAlerts()
    const { error, getDataStore } = useDataStore({ keySpace });
    const [loading, setLoading] = useState(false);

    const [mutate,] = useDataMutation({
        resource: `${keySpace}`,
        data: () => [],
        type: 'create', 
    },
        {
            onError(error) {
                setLoading(false);
                show({
                    message: `Could not get data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            },
            onComplete: async (data) => {
                setLoading(false);
                await getDataStore(false)
            }
        }
    )

    const createDir = async (...args: any[]) => {
        setLoading(true);
        await mutate(...args);
    }

    return { createDir, error, loading }
}