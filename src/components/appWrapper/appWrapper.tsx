import { useEffect, useState } from 'react'
import { Center, CircularLoader } from "@dhis2/ui"
import { DataStoreNotFound, DataStoreNotValidated, ProgramNotFound } from './components/dataStoreErrors';
import { AppWrapperProps } from '../../types/appWrapper/AppWrapperProps';
import { DataProvider } from '@dhis2/app-runtime';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useCheckDataStore } from '../../hooks/appWrapper/useCheckDataStore';
import useDataStore from '../../hooks/appWrapper/useDataStore';
import { SchoolCalendarData } from '../../schemas/schoolCalendar';

const AppWrapperRaw = ({ children, dataStoreKey, validate }: AppWrapperProps) => {
  const { createError, error, loading, startCheck, errorProgram, validationError, } = useCheckDataStore(dataStoreKey)
  const { error: errorSchoolCalendar, getDataStore: getCallendar, loading: loadingCalendar } = useDataStore({ keySpace: "dataStore/semis/schoolCalendar" });
  const setCalendarValues = useSetRecoilState(SchoolCalendarData)

  useEffect(() => {
    void startCheck(validate)
    void getCallendar(false).then((resp) => {
      setCalendarValues(resp)
    })
  }, [])

  if (loading || loadingCalendar ) {
    return (
      <Center>
        <CircularLoader />
      </Center>
    )
  }

  if (error || createError || errorSchoolCalendar) {
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

type CombinedTypes = AppWrapperProps & { baseUrl: string };

const AppWrapper = ({ children, dataStoreKey, baseUrl, validate }: CombinedTypes) => {

  return (
    <DataProvider baseUrl={baseUrl}>
      <RecoilRoot>
        <AppWrapperRaw validate={validate} dataStoreKey={dataStoreKey}>
          {children}
        </AppWrapperRaw>
      </RecoilRoot>
    </DataProvider>
  )
}

export { AppWrapper }