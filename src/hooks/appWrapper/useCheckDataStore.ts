import useShowAlerts from "../common/useShowAlert";
import useDataStore from "./useDataStore";
import { useCreateDsDir } from "./useCreateDsDir";
import { useDataEngine } from "@dhis2/app-runtime"
import { useState } from 'react'
import useProgramConfig from "./useProgramConfig";
import { ProgramConfigState } from "../../schemas/programSchema";
import { useSetRecoilState } from "recoil";

const DATASTORE_QUERY = (keySpace: string) => {
    return {
        result: {
            resource: `${keySpace}`,
            params: {
                fields: "."
            }
        }
    }
}

export function useCheckDataStore(keySpace: string) {
    const { hide, show } = useShowAlerts()
    const engine = useDataEngine()
    const [loading, setLoading] = useState<boolean>(true)
    const { createDir, error: createError, loading: creatingDir } = useCreateDsDir({ keySpace })
    const { error, validationError, getDataStore } = useDataStore({ keySpace });
    const nameSpace = keySpace.substring(0, keySpace.lastIndexOf("/"))
    const { getProgram, error: errorProgram, loading: loadingProgram } = useProgramConfig()
    const setProgramsValues = useSetRecoilState(ProgramConfigState)

    const startCheck = async (validate: boolean) => {
        setLoading(true)
        await engine.query(DATASTORE_QUERY(nameSpace), {
            onError(error) {
                setLoading(false)
                show({
                    message: `Could not get data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            },
            onComplete(data) {
                checkDataStore(data?.result, validate)
                    .catch((error) => {
                        show({
                            message: `Error checking data store: ${error.message}`,
                            type: { critical: true }
                        });
                        setTimeout(hide, 5000);
                    }).finally(() => {
                        setLoading(false);
                    })
            }
        })
    }

    const checkDataStore = async (data: any, validate: boolean) => {
        const hasTemplatesKey = data?.entries?.some((entry: any) => entry.key == keySpace?.split('/')?.[keySpace?.split('/').length - 1]);
        if (data?.entries?.length && hasTemplatesKey) {
            return await getDataStore(validate).then(async (resp) => {
                let programs: any = []

                for (let i = 0; i < resp?.length; i++) {
                    const result = await getProgram(resp?.[i].program)
                    programs.push(result)
                }

                setProgramsValues(programs);
            })
        } else {
            return await createDir()
        }
    }

    return {
        loading: loading || loadingProgram || creatingDir,
        error,
        createError,
        validationError,
        startCheck,
        errorProgram
    }
}
