import { useState } from "react"
import { useDataEngine } from "@dhis2/app-runtime"

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
  const [validationError, _] = useState<object | null>(null)

  const getDataStore = async () => {
    try {
      setLoading(true)
      const response: any = await engine.query(DATASTORE_QUERY(keySpace))
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