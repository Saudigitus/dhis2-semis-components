import { useState } from "react"
import { dataStoreSchemaValidator, DataStoreState } from "../../schemas/dataStore"
import { useDataEngine } from "@dhis2/app-runtime"
import { useSetRecoilState } from "recoil"

const DATASTORE_QUERY = (keySpace: string) => {
  return {
    result: {
      resource: `${keySpace}`,
      params: {
        fields: "*"
      }
    }
  }
}

export const useDataStore = ({ keySpace }: { keySpace: string }) => {
  const engine = useDataEngine()
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<object | null>(null)
  const setDataStoreValues = useSetRecoilState(DataStoreState)

  const getDataStore = async (validate: boolean) => {
    try {
      setLoading(true)
      const response: any = await engine.query(DATASTORE_QUERY(keySpace))

      if (typeof dataStoreSchemaValidator(response?.result) === "object" && validate === true) {
        setValidationError(dataStoreSchemaValidator(response?.result) as object)
      } else {
        setDataStoreValues(response?.result as any)
      }

      return response?.result
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { error, validationError, getDataStore, loading }
}

export default useDataStore