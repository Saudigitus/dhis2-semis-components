import { useRecoilValue } from "recoil"
import { HeaderValuesState } from "../../schemas/headerDataSchema"


const useHeaderKey = () => {
    const headerValues = useRecoilValue(HeaderValuesState)
    return { headerValues }
}

export default useHeaderKey