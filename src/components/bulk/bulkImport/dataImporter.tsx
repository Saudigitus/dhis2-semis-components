import { DataProvider } from '@dhis2/app-runtime';
import { importData } from '../../../types/bulk/bulkOperations';
import ProcessImport from './processImport';

export default function DataImporter(props: importData) {
    const { baseURL } = props

    return (
        <DataProvider baseUrl={baseURL} >
            <ProcessImport {...props} />
        </DataProvider>
    )
}