import { modules } from '../../types/common/moduleTypes'
import { CustomAttributeProps, VariablesTypes } from '../../types/variables/AttributeColumns'

export function exportFields(module: "attendance" | "final-result" | "enrollment" | "performance"): any[] {

    const commonFields = [
        {
            "required": true,
            "name": "orgUnitName",
            "labelName": "School",
            "valueType": "TEXT" as unknown as CustomAttributeProps['valueType'],
            "disabled": true,
            "visible": true,
            "description": "label",
            "id": "label",
            "displayName": "label",
            "type": VariablesTypes.DataElement
        },
        {
            "required": true,
            "name": "academicYear",
            "labelName": "Academic Year",
            "valueType": "TEXT" as unknown as CustomAttributeProps['valueType'],
            "disabled": true,
            "visible": true,
            "description": "label",
            "id": "label",
            "displayName": "label",
            "type": VariablesTypes.DataElement
        },
    ]

    const emptyTemplateField = [
        {
            "required": true,
            "name": "rows",
            "labelName": "Number of Rows",
            "valueType": "TEXT" as unknown as CustomAttributeProps['valueType'],
            "disabled": false,
            "visible": true,
            "description": "label",
            "id": "label",
            "displayName": "label",
            "type": VariablesTypes.DataElement
        }
    ]

    const attendanceFields = [
        {
            "required": true,
            "name": "grade",
            "labelName": "Grade",
            "valueType": "TEXT" as unknown as CustomAttributeProps['valueType'],
            "disabled": true,
            "visible": true,
            "description": "label",
            "id": "label",
            "displayName": "label",
            "type": VariablesTypes.DataElement
        },
        {
            "required": true,
            "name": "class",
            "labelName": "Class/section",
            "valueType": "TEXT" as unknown as CustomAttributeProps['valueType'],
            "disabled": true,
            "visible": true,
            "description": "label",
            "id": "label",
            "displayName": "label",
            "type": VariablesTypes.DataElement
        },
        {
            "required": true,
            "name": "dateRange",
            "labelName": "Date Range",
            "valueType": "DATE_RANGE" as unknown as CustomAttributeProps['valueType'],
            "disabled": false,
            "visible": true,
            "description": "label",
            "id": "label",
            "displayName": "label",
            "type": VariablesTypes.DataElement
        }
    ]

    switch (module) {
        case modules.attendance:
            return [...commonFields, ...attendanceFields]

        case modules.enrollment:
            return [...commonFields, ...emptyTemplateField]
    }

    return []
}