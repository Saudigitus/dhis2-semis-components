import { useState, useEffect } from 'react'
import { Center, CircularLoader } from "@dhis2/ui"
import { DataStoreNotFound, DataStoreNotValidated, ProgramNotFound } from './components/dataStoreErrors';
import useDataStore from '../../hooks/appWrapper/useDataStore';
import useProgramConfig from '../../hooks/appWrapper/useProgramConfig';
import { DataStoreProps} from '../../schemas/dataStore';
import { AppWrapperProps } from '../../types/appWrapper/AppWrapperProps';

const AppWrapper = ({ children, dataStoreKey }: AppWrapperProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { error, validationError, getDataStore } = useDataStore(dataStoreKey);
  const { getProgram, data: programs, error: errorProgram } = useProgramConfig()
 
  useEffect(() => {
    void getDataStore()
      .then(async (response: DataStoreProps) => {
        for (let i = 0; i < response.length; i++) {
          await getProgram(response?.[i].program)
        }
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
  }, [])


  if (loading) {
    return (
      <Center>
        <CircularLoader />
      </Center>
    )
  }

  if (error) {
    return (<DataStoreNotFound error={error ?? errorProgram} />)
  }

  if (errorProgram) {
    return (<ProgramNotFound error={error ?? errorProgram} />)
  }

  if (validationError) {
    return (<DataStoreNotValidated error={validationError} />)
  }

  return (
    <div>
      <span>{JSON.stringify(programs)}</span>
      {children}
    </div>
  )
}
export { AppWrapper}