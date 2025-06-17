import ModalComponent from '../../../components/modal/Modal'
import CustomForm from '../../../components/form/form'
import { exportFields } from '../../../utils/constants/exportFields'
import { format } from 'date-fns'
import { useUrlParams } from 'dhis2-semis-functions';
import { useGetFileName } from '../../../hooks/common/useGetFileName';

export default function ModalExportEmpty({ open, setOpen, onSubmit, module, Form }: { Form: any, onSubmit: (rows: any) => void, open: boolean, setOpen: (args: boolean) => void, module: "attendance" | "final-result" | "enrollment" | "performance" }) {
    const { urlParameters } = useUrlParams()
    const { schoolName: orgUnitName, academicYear, class: section, grade } = urlParameters()
    const { getFileName } = useGetFileName()
    const fileName = getFileName(module)

    return (
        <ModalComponent
            open={open}
            size='large'
            handleClose={() => setOpen(false)}
            title='Export Data Details'
            children={
                <CustomForm
                    storyBook={false}
                    Form={Form}
                    initialValues={{ orgUnitName: orgUnitName, academicYear: academicYear, class: section, grade: grade }}
                    onFormSubtmit={(e) => {
                        void onSubmit({
                            fileName: fileName,
                            numberOfEmptyRows: e.rows,
                            startDate: format((e?.dateRange?.startDate ?? new Date()), 'yyyy-MM-dd'),
                            endDate: format((e?.dateRange?.endDate ?? new Date()), 'yyyy-MM-dd')
                        })
                    }}
                    withButtons={true}
                    formFields={[
                        {
                            "name": "Details",
                            "storyBook": false,
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