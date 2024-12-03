import { useRecoilValue } from "recoil"
import { ProgramConfigState } from "../../schemas/programSchema"

const useProgramsKeys = () => {
  const programsValues = useRecoilValue(ProgramConfigState)
  return {programsValues}
}

export default useProgramsKeys