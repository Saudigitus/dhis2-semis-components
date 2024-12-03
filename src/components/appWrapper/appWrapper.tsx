import { useState, useEffect } from 'react'
import { Center, CircularLoader } from "@dhis2/ui"
import { DataStoreNotFound, DataStoreNotValidated, ProgramNotFound } from './components/dataStoreErrors';
import useDataStore from '../../hooks/appWrapper/useDataStore';
import useProgramConfig from '../../hooks/appWrapper/useProgramConfig';
import { DataStoreProps} from '../../schemas/dataStore';
import { AppWrapperProps } from '../../types/appWrapper/AppWrapperProps';

const AppWrapper = ({ children, dataSoteKey }: AppWrapperProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { error, validationError, getDataStore } = useDataStore(dataSoteKey);
  const { getProgram, data: programs, error: erroProgram } = useProgramConfig()
 
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
    return (<DataStoreNotFound error={error ?? erroProgram} />)
  }

  if (erroProgram) {
    return (<ProgramNotFound error={error ?? erroProgram} />)
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