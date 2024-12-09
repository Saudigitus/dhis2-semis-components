import { useState, useEffect } from 'react'
import { Center, CircularLoader } from "@dhis2/ui"
import { DataStoreNotFound, DataStoreNotValidated, ProgramNotFound } from './components/dataStoreErrors';
import useDataStore from '../../hooks/appWrapper/useDataStore';
import useProgramConfig from '../../hooks/appWrapper/useProgramConfig';
import { DataStoreProps } from '../../schemas/dataStore';
import { AppWrapperProps } from '../../types/appWrapper/AppWrapperProps';
import { DataProvider,useConfig } from '@dhis2/app-runtime';
import { RecoilRoot } from 'recoil';

const AppWrapperRaw = ({ children, dataStoreKey }: AppWrapperProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { error, validationError, getDataStore } = useDataStore(dataStoreKey);
  const { getProgram, data: programs, error: errorProgram } = useProgramConfig()

  useEffect(() => {
    void getDataStore()
      .then(async (response: DataStoreProps) => {
        console.log(response, "response app wrapper")
        for (let i = 0; i < response.length; i++) {
          await getProgram(response?.[i].program)
        }
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
  }, [])

  console.log(error, "Chegou aqui")

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
      {children}
    </div>
  )
}


const AppWrapper = ({ children, dataStoreKey }: AppWrapperProps) => {
  const {baseUrl} = useConfig()

  console.log(baseUrl,"dssd")
  return (
    <DataProvider baseUrl='http://localhost:8080'>
      <RecoilRoot>
        <AppWrapperRaw dataStoreKey={dataStoreKey}>
          {children}
        </AppWrapperRaw>
      </RecoilRoot>
    </DataProvider>
  )
}

export { AppWrapper }