import { DataProvider } from '@dhis2/app-runtime';
import { ExportData } from '../../../types/bulk/bulkOperations';

export default function DataImporter(props: ExportData) {
    const { baseURL } = props

    return (
        <DataProvider baseUrl={baseURL} >
            <></>
            {/* <ProcessExport {...props} /> */}
        </DataProvider>
    )
}