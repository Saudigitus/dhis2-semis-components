import { ReactNode } from "react"

interface AppWrapperProps {
    /** Wrapp your entire app with the wrapper*/
    children: ReactNode
    /** Pass here your datastore key space and then you can get data store values and programs using the following hooks:
     *   const programsValues = useProgramsKeys() - for your array of programs
    */
    dataStoreKey: string
    schoolCalendarKey: string
    baseUrl: string
}

export type { AppWrapperProps }