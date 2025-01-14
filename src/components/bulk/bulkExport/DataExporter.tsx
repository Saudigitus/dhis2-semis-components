import { DataProvider } from '@dhis2/app-runtime';
import { ExportData } from '../../../types/bulk/bulkOperations';
import ProcessExport from './processExport';

export default function DataExporter(props: ExportData) {
    const { baseURL } = props

    return (
        <DataProvider baseUrl={baseURL} >
            <ProcessExport {...props} />
        </DataProvider>
    )
}