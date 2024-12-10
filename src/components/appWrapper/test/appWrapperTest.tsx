import { Center, CircularLoader } from "@dhis2/ui"
import { useEffect, useState } from "react"
import { AppWrapperProps } from "../../../types/appWrapper/AppWrapperProps";

const AppWrapperTest = ({ children,dataStoreKey }: AppWrapperProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Configura o timeout para ocultar o loader após 5 segundos
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);
  
      return () => clearTimeout(timeout); // Limpa o timeout caso o componente seja desmontado
    }, []);

    if (isLoading) {
        return (
          <Center>
            <CircularLoader />
          </Center>
        )
      }
    return (
        <div>{children}</div>
    )
}

export default AppWrapperTest