import { useDataEngine } from "@dhis2/app-runtime"
import { useState } from "react"

const PROGRAMQUERY: any = (id: string) => ({
  results: {
    resource: "programs",
    id: id,
    params: {
      fields: [
        "access",
        "id,displayName,description,programType,version,translations",
        "trackedEntityType[id,trackedEntityTypeAttributes[trackedEntityAttribute[id]]]",
        "programTrackedEntityAttributes[name,displayName,mandatory,searchable,displayInList,trackedEntityAttribute[translations,generated,pattern,id,displayName,name,formName,unique,valueType,optionSet[options[translations,style,code~rename(value),displayName~rename(label)]]]]",
        "programStages[id,displayName,autoGenerateEvent,repeatable,translations,programStageDataElements[translations,name,displayName,displayInReports,compulsory,dataElement[translations,id,displayName,formName,name,valueType,optionSet[options[translations,style,code~rename(value),displayName~rename(label)]]]]]"
      ]
    }
  }
})


const useProgramConfig = () => {
  const [data, setData] = useState<unknown>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)
  const engine = useDataEngine()

  const getProgram = async (program: string) => {
    setLoading(true)
    try {
      const response = await engine.query(PROGRAMQUERY(program));
      setData(response?.results)
      return response?.results
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }


  return { data, loading, error, getProgram }
}

export default useProgramConfig