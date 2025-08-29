import { useEffect } from 'react'
import { Center, CircularLoader } from "@dhis2/ui"
import { DataStoreNotFound, ProgramNotFound } from './components/dataStoreErrors';
import { AppWrapperProps } from '../../types/appWrapper/AppWrapperProps';
import { DataProvider } from '@dhis2/app-runtime';
import { RecoilRoot, } from 'recoil';
import { useSetupDataStore } from '../../hooks/appWrapper/useSetupDataStore';

const AppWrapperRaw = ({ children, dataStoreKey, schoolCalendarKey }: AppWrapperProps) => {
  const { setupDataStore, error, errorProgram, loading } = useSetupDataStore({ dataStoreKey, schoolCalendarKey })

  useEffect(() => {
    setupDataStore()
  }, [])

  if (loading) {
    return (
      <Center>
        <CircularLoader />
      </Center>
    )
  }

  if (errorProgram) {
    return (<ProgramNotFound error={error ?? errorProgram} />)
  }


  return (
    <div>
      {children}
    </div>
  )
}

type CombinedTypes = AppWrapperProps & { baseUrl: string };

const AppWrapper = ({ children, dataStoreKey, baseUrl, schoolCalendarKey }: CombinedTypes) => {

  return (
    <DataProvider baseUrl={baseUrl}>
      <RecoilRoot>
        <AppWrapperRaw dataStoreKey={dataStoreKey} schoolCalendarKey={schoolCalendarKey}>
          {children}
        </AppWrapperRaw>
      </RecoilRoot>
    </DataProvider>
  )
}

export { AppWrapper }