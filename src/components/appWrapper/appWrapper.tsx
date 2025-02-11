import { useState, useEffect } from 'react'
import { Center, CircularLoader } from "@dhis2/ui"
import { DataStoreNotFound, DataStoreNotValidated, ProgramNotFound } from './components/dataStoreErrors';
import useDataStore from '../../hooks/appWrapper/useDataStore';
import useProgramConfig from '../../hooks/appWrapper/useProgramConfig';
import { DataStoreProps } from 'dhis2-semis-types';
import { AppWrapperProps } from '../../types/appWrapper/AppWrapperProps';
import { DataProvider } from '@dhis2/app-runtime';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { ProgramConfigState } from '../../schemas/programSchema';

const AppWrapperRaw = ({ children, dataStoreKey }: AppWrapperProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { error, validationError, getDataStore } = useDataStore(dataStoreKey);
  const { getProgram, error: errorProgram } = useProgramConfig()
  const setProgramsValues = useSetRecoilState(ProgramConfigState
  )

  useEffect(() => {
    void getDataStore()
      .then(async (response: DataStoreProps) => {
        let programs: any = []

        for (let i = 0; i < response.length; i++) {
          const result = await getProgram(response?.[i].program)
          programs.push(result)
        }

        setProgramsValues(programs);
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
      {children}
    </div>
  )
}


const AppWrapper = ({ children, dataStoreKey }: AppWrapperProps) => {

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