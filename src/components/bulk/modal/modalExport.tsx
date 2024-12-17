import { CustomAttributeProps, VariablesTypes } from '../../../types/variables/AttributeColumns'
import { DataStoreRecord } from '../../..//types/dataStore/DataStoreConfig'
import ModalComponent from '../../../components/modal/Modal'
import CustomForm from '../../../components/form/form'

export default function ModalExportEmpty({ orgUnitName, eventFilters, open, setOpen, onSumit, selectedSectionDataStore }: { selectedSectionDataStore: DataStoreRecord, onSumit: (rows: any) => void, orgUnitName: string, eventFilters: string[], open: boolean, setOpen: (args: boolean) => void }) {

    function getAcademicYear() {
        const academicYearFilter = eventFilters.find(x => x.includes(selectedSectionDataStore.registration.academicYear))?.split(":") as unknown as string

        return academicYearFilter[2]
    }

    return (
        <ModalComponent
            open={open}
            size='large'
            handleClose={() => setOpen(false)}
            title='Data Import Template Export'
            children={
                <CustomForm
                    initialValues={{ orgUnitName: orgUnitName, academicYear: getAcademicYear() }}
                    onFormSubtmit={(e) => {
                        void onSumit(e.rows)
                    }}
                    withButtons={true}
                    onInputChange={() => { }}
                    formFields={[
                        {
                            "name": "Details",
                            "description": "This file will allow the import of new Student data into the system.",
                            "fields": [
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
                        },
                    ]}
                />
            }

        />
    )

}