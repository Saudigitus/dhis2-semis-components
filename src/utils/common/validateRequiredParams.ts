import { ExportData } from "../../types/bulk/bulkOperations";
import { modules } from "../../types/common/moduleTypes";
import { isDateFormatValid } from "../format/checkDateFormat";

export function areParamsValid(props: ExportData) {
    let valid = true, msg = ""

    const {
        programConfig,
        fileName,
        orgUnit,
        stagesToExport,
        module,
        selectedSectionDataStore,
        sectionType,
        orgUnitName,
        eventFilters,
    } = props

    if (!fileName || !orgUnit || !module || !programConfig || !sectionType || !orgUnitName || !selectedSectionDataStore) {
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