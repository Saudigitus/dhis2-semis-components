import { DataStoreRecord } from "../dataStore/DataStoreConfig"
import { ProgramConfig } from "../programConfig/ProgramConfig"

/**
 * Description placeholder
 *
 * @interface ExportData
 * @typedef {ExportData}
 */
/**
 * Description placeholder
 *
 * @interface ExportData
 * @typedef {ExportData}
 */
interface ExportData {
    /**
     * Error handler
     */
    onError: (args: string) => void
    
    /**
     * Base url for dhis2 data provider
     */
    baseURL: string
    setProgress?: (args: any) => void
    /**
     * The label wich will appear do identify componet
     */
    label: string
    /**
     * Exported file name
     *
     * @type {string}
     */
    fileName: string

    /**
     * The id of the organisationa unit from which the data will be retrieved
     *
     * @type {string}
     */
    orgUnit: string

    /**
     * Array of program stages id to export data
     * 
     * @type {string[]}
     */
    stagesToExport: string[]

    /**
     * The array of filters applied to the headers (class, grade & academic year)
     * 
     * dataElementId:operator:value
     *
     * @type {?string[]}
     */
    eventFilters: string[]

    /**
     * The selected org unit name
     *
     * @type {string}
     */
    orgUnitName: string

    /**
     * The data of the socio-economics stge is not mandatory, if you want this data 
     * 
     * in your exported file you must set this variable to true. 
     * 
     * This does not apply to the enrollment module. In the enrollment module, the 
     * 
     * values for this stage will always be exported
     *
     * @type {?boolean}
     */
    withSocioEconomics?: boolean

    /**
     * selected section type name
     *
     * @type {string}
     */
    sectionType: string

    /**
     * Depending on the module, the data is exported with a focus on just one programme stage,
     * 
     * so this variable is intended to receive the name of the section that will contain this data.
     *
     * @type {?string}
     */
    module: "attendance" | "final-result" | "enrollment" | "performance",

    /**
     * Settings saved at data store
     *
     * @type {DataStoreRecord}
     */
    selectedSectionDataStore: DataStoreRecord

    /**
    * Program configurations
    *
    * @type {ProgramConfig}
    */
    programConfig: ProgramConfig

    /**
    * function tha chekcs if the given date is school day or no
    *
    * @type {function}
    */
    isSchoolDay?: (date: Date) => boolean

    /**
     * Sometimes we may need a blank file to add new data, with just the structure and headers. 
     * 
     * So this variable is intended to tell us whether the file to be exported should be empty
     * 
     * or contain the events of the registered students.
     *
     * @type {?boolean}
     */
    empty?: boolean
}

interface GenerateHeaders {
    stagesToExport: string[]
    selectedSectionDataStore: DataStoreRecord
    withSocioEconomics: boolean
    programConfig: ProgramConfig
    sectionType: string
    isSchoolDay?: (date: Date) => boolean
    module: string
    empty: boolean
}

interface excelProps {
    headers: any[]
    rows: any[]
    filters: any
    fileName: string
    metadata: any[]
    module: string
    empty: boolean
    defaultLockedHeaders: string[]
}

interface excelData {
    excelData: {
        module: "attendance" | "final-result" | "enrollment" | "performance",
        mapping: []
    }
}

export enum importStrategy {
    CREATE = "CREATE_AND_UPDATE",
    UPDATE = "UPDATE"
}

interface importData {
    /**
     * Error handler
     */
    onError: (args: string) => void

    /**
    * Base url for dhis2 data provider
    * 
    *  @type {string}
    */
    baseURL: string

    /**
    * The label wich will appear do identify componet
    * 
    *  @type {string}
    */
    label: string

    /**
    * this variable makes the system know that it will have to update
    * 
    * existing data using data in this file. 
    * 
    * it'll only work work enrollment module only
    * 
    *  @type {boolean}
    */
    updating?: boolean

    /**
     * Depending on the module, the data is exported with a focus on just one programme stage,
     * 
     * so this variable is intended to receive the name of the section that will contain this data.
     *
     * @type {string}
     */
    module: "attendance" | "final-result" | "enrollment" | "performance"

    /**
     * This variable makes the system know the operation to be done in the 
     * 
     * dhis2 api, validate to see if the data is in the correct form
     * 
     * or commit to save data already verified
     * 
     */
    importMode: "VALIDATE" | "COMMIT"

    /**
     * The selected program definitions
     */
    programConfig: ProgramConfig

    /**
     * The selected section type
     */
    sectionType: string

    /**
     * Data store configuration for SEMIS
     */
    selectedSectionDataStore: DataStoreRecord

    /**
     * the selected organization unit at header filters
     */
    orgUnit?: string
}

export type { ExportData, GenerateHeaders, excelProps, importData, excelData }