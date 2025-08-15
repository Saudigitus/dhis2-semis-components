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

export const useGetDataStore = () => {
  const engine = useDataEngine()
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getDataStore = async (keySpace: string) => {
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
  return { error, getDataStore, loading }
}
export default useGetDataStore