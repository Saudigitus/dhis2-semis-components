import { ExportData } from "../../types/bulk/bulkOperations";
import { modules } from "../../types/common/moduleTypes";

export function areParamsValid(props: ExportData) {
    let valid = true, msg = ""

    const {
        programConfig,
        fileName,
        stagesToExport,
        module,
        selectedSectionDataStore,
        sectionType,
        eventFilters,
    } = props

    if (!fileName || !module || !programConfig || !sectionType || !selectedSectionDataStore) {
        valid = false
        msg = "Please send all required parameters"
    }
    else if (eventFilters.length === 0) {
        valid = false
        msg = "The header filters must not be empty"
    }
    else if (module != modules.enrollment && stagesToExport.length === 0) {
        valid = false
        msg = "The array of stages to be exported must not be empty"
    }

    return { valid: valid, msg: msg }
}