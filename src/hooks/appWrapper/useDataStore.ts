import { dataStoreSchemaValidator, DataStoreState } from "../../schemas/dataStore"
import { useState } from "react"
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

const useDataStore = (keySpace: string) => {
  const engine = useDataEngine()
  const [, setData] = useState<unknown>(null)
  const [, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)
  const [validationError, setValidationError] = useState<object | null>(null)
  const setDataStoreValues = useSetRecoilState(DataStoreState)

  const getDataStore = async (validate: boolean) => {
    setLoading(true)
    try {
      console.log(validate)
      const response = await engine.query(DATASTORE_QUERY(keySpace))
      if (typeof dataStoreSchemaValidator(response?.result) === "object" && validate == true) {
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