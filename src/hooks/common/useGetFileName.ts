import { useGetSectionTypeLabel, useUrlParams } from 'dhis2-semis-functions'
import { useDataStoreKey } from '../dataStore/useDataStoreKey'

export function useGetFileName() {
    const { useQuery } = useUrlParams()
    const { sectionName } = useGetSectionTypeLabel()
    const { filters } = useDataStoreKey({ sectionType: sectionName })

    function getFileName(module: string): string {
        const capitalizedSectionName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1)
        const capitalizedModule = module.charAt(0).toUpperCase() + module.slice(1)        

        let name = `SEMIS - ${capitalizedSectionName}s ${capitalizedModule}`
        for (const filter of filters?.dataElements) {
            name += ' - ' + useQuery.get(filter.code)
        }

        return name
    }

    return { getFileName }
}