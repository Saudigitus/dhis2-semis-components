import { dataStoreSchemaValidator, DataStoreState } from "../../schemas/dataStore"
import { useState } from "react"
import { useDataEngine } from "@dhis2/app-runtime"
import { useSetRecoilState } from "recoil"


const DATASTORE_QUERY = (keySpace: string) => {
  return {
    result: {
      resource: `dataStore/semis/values`,
      params: {
        fields: "*"
      }
    }
  }
}

const useDataStore = (keySpace: string) => {
  const engine = useDataEngine()
  const [, setData] = useState<unknown>(null)
  const [, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)
  const [validationError, setValidationError] = useState<object | null>(null)
  const setDataStoreValues = useSetRecoilState(DataStoreState)

  const getDataStore = async () => {
    setLoading(true)
    try {
      const response = await engine.query(DATASTORE_QUERY(keySpace))
      if (typeof dataStoreSchemaValidator(response?.result) === "object") {
        setValidationError(dataStoreSchemaValidator(response?.result) as object)
      } else {
        setData(response?.result)
        setDataStoreValues(response?.result as any)
      }
      return response?.result
    } catch (error) {
      setError(error)
    } finally {
    }
  }

  return { error, validationError, getDataStore }
}

export default useDataStore