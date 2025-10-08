import { useEffect } from 'react'
import { Center, CircularLoader } from "@dhis2/ui"
import { ProgramNotFound } from './components/dataStoreErrors';
import { AppWrapperProps } from '../../types/appWrapper/AppWrapperProps';
import { DataProvider } from '@dhis2/app-runtime';
import { RecoilRoot, } from 'recoil';
import { useSetupDataStore } from '../../hooks/appWrapper/useSetupDataStore';
import { useGetSysInfo } from 'dhis2-semis-functions';

const AppWrapperRaw = ({ children, dataStoreKey, schoolCalendarKey }: AppWrapperProps) => {
  const { setupDataStore, error, errorProgram, loading } = useSetupDataStore({ dataStoreKey, schoolCalendarKey })
  const { loading: loadingSysInfo } = useGetSysInfo()

  useEffect(() => {
    setupDataStore()
  }, [])

  if (loading || loadingSysInfo) {
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
   <DataProvider baseUrl={baseUrl} apiVersion={39}>
      {children}
     </DataProvider>
  )
}

type CombinedTypes = AppWrapperProps & { baseUrl: string };

const AppWrapper = ({ children, dataStoreKey, baseUrl, schoolCalendarKey }: CombinedTypes) => {

  return (
    <DataProvider baseUrl={baseUrl} apiVersion={39}>
      <RecoilRoot>
        <AppWrapperRaw dataStoreKey={dataStoreKey} schoolCalendarKey={schoolCalendarKey}>
          {children}
        </AppWrapperRaw>
      </RecoilRoot>
    </DataProvider>
  )
}

export { AppWrapper }