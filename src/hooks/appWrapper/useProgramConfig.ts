import { useDataEngine } from "@dhis2/app-runtime"
import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { ProgramConfigState } from "../../schemas/programSchema"

const PROGRAMQUERY: any = (id: string) => ({
  results: {
    resource: "programs",
    id: id,
    params: {
      fields: [
        "access",
        "id,displayName,description,programType,version",
        "trackedEntityType[id,trackedEntityTypeAttributes[trackedEntityAttribute[id]]]",
        "programTrackedEntityAttributes[mandatory,searchable,displayInList,trackedEntityAttribute[generated,pattern,id,displayName,formName,unique,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]",
        "programStages[id,displayName,autoGenerateEvent,repeatable, programStageDataElements[displayInReports,compulsory,dataElement[id,displayName,formName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]]"
      ]
    }
  }
})


const useProgramConfig = () => {
  const [data, setData] = useState<unknown>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)
  const engine = useDataEngine()
  const setProgramsValues = useSetRecoilState(ProgramConfigState)


  const getProgram = async (program: string) => {
    setLoading(true)
    try {
      const reponse = await engine.query(PROGRAMQUERY(program));
      setProgramsValues((prevState) => [...prevState, reponse?.results]);
      setData(reponse?.results)
      return reponse?.results
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }


  return { data, loading, error, getProgram }
}

export default useProgramConfig