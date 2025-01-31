import { useRecoilValue } from "recoil"
import { ProgramConfigState } from "../../schemas/programSchema"
import { ProgramConfig } from "dhis2-semis-types"

const useProgramsKeys = (): ProgramConfig[] => {
  const programsValues = useRecoilValue(ProgramConfigState)
  return programsValues
}

export default useProgramsKeys