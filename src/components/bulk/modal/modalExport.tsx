import { DataStoreRecord } from '../../../types/dataStore/DataStoreConfig'
import ModalComponent from '../../../components/modal/Modal'
import CustomForm from '../../../components/form/form'
import { exportFields } from '../../../utils/constants/exportFields'
import { format } from 'date-fns'

export default function ModalExport({ orgUnitName, eventFilters, open, setOpen, onSubmit, selectedSectionDataStore, module }: { selectedSectionDataStore: DataStoreRecord, onSubmit: (rows: any) => void, orgUnitName: string, eventFilters: string[], open: boolean, setOpen: (args: boolean) => void, module: "attendance" | "final-result" | "enrollment" | "performance" }) {

    function getAcademicYear() {
        const academicYearFilter = eventFilters.find(x => x.includes(selectedSectionDataStore.registration.academicYear))?.split(":") as unknown as string
        const section = eventFilters.find(x => x.includes(selectedSectionDataStore.registration.section))?.split(":") as unknown as string
        const grade = eventFilters.find(x => x.includes(selectedSectionDataStore.registration.grade))?.split(":") as unknown as string

        return { academicYear: academicYearFilter?.[2] ?? "", class: section?.[2] ?? "", grade: grade?.[2] ?? "" }
    }

    return (
        <ModalComponent
            open={open}
            size='large'
            handleClose={() => setOpen(false)}
            title='Export Data Details'
            children={
                <CustomForm
                    initialValues={{ orgUnitName: orgUnitName, ...getAcademicYear() }}
                    onFormSubtmit={(e) => {
                        void onSubmit({
                            numberOfEmptyRows: e.rows,
                            startDate: format((e?.dateRange?.startDate ?? new Date()), 'yyyy-MM-dd'),
                            endDate: format((e?.dateRange?.endDate ?? new Date()), 'yyyy-MM-dd')
                        })
                    }}
                    withButtons={true}
                    formFields={[
                        {
                            "name": "Details",
                            "description": "This file will allow the import of new student data into the system.",
                            "fields": [
                                ...exportFields(module)
                            ]
                        },
                    ]}
                />
            }

        />
    )

}