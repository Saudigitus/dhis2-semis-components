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
    const { createDir, error: createError } = useCreateDsDir({ keySpace, setLoading })
    const { error, validationError, getDataStore } = useDataStore({ keySpace, setLoading });
    const nameSpace = keySpace.substring(0, keySpace.lastIndexOf("/"))
    const { getProgram, error: errorProgram } = useProgramConfig()
    const setProgramsValues = useSetRecoilState(ProgramConfigState)

    const startCheck = async (validate: boolean) => {
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
            }
        })
    }

    const checkDataStore = async (data: any, validate: boolean) => {
        const hasTemplatesKey = data?.entries?.some((entry: any) => entry.key == keySpace?.split('/')?.[keySpace?.split('/').length - 1]);
        if (data?.entries?.length && hasTemplatesKey) {
            await getDataStore(validate).then(async (resp) => {
                let programs: any = []

                for (let i = 0; i < resp; i++) {
                    const result = await getProgram(resp?.[i].program)
                    programs.push(result)
                }

                setProgramsValues(programs);
            })
        } else {
            await createDir()
        }
    }

    return {
        loading,
        error,
        createError,
        validationError,
        startCheck,
        errorProgram
    }
}
