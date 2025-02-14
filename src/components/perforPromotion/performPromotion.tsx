import { useBuildForm, modules } from "dhis2-semis-functions";
import { useDataStoreKey } from "../../hooks/dataStore/useDataStoreKey";
import { useState } from "react";
import { NoticeBox, Button, IconAddCircle24 } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import CustomForm from "../form/form";
import ModalComponent from "../modal/Modal";
import useProgramsKeys from "../../hooks/appWrapper/useProgramsKeys";
import WithBorder from "../template/WithBorder";
import { staticForm } from "../../utils/constants/searchEnrollmentForm";

export default function PerformPromotion({ selected, Form, loading, onSubmit }: { onSubmit: (e: any) => void, selected: any[], Form: any, loading: boolean }) {
    const programsValues = useProgramsKeys();
    const programData = programsValues[0];
    const dataStoreData = useDataStoreKey({ sectionType: "student" });
    const { formData } = useBuildForm({ dataStoreData, programData, module: modules.enrollment });
    const [enrollmentDetails = []] = formData;
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => {
                setOpen(true);
            }} icon={<IconAddCircle24 />}
            >
                <span>Perform promotion</span>
            </Button >

            {
                open && <ModalComponent
                    children={<WithPadding>
                        <NoticeBox title={`WARNING! ${selected.length} rows will be affected`} warning>
                            No one will be able to access this program. Add some Organisation Units to the access list.
                        </NoticeBox>
                        <WithBorder type="all" >
                            <WithPadding>
                                <CustomForm
                                    Form={Form}
                                    loading={loading}
                                    formFields={[
                                        {
                                            storyBook: false,
                                            name: "Student promotion",
                                            description: "Student promotion",
                                            fields: [
                                                staticForm().registeringSchool,
                                                ...enrollmentDetails,
                                                staticForm().enrollmentDate
                                            ]
                                        }
                                    ]}
                                    storyBook={false}
                                    withButtons={true}
                                    onFormSubtmit={(e) => onSubmit(e)}
                                    onCancel={() => setOpen(false)}
                                />
                            </WithPadding>
                        </WithBorder>
                    </WithPadding>}
                    open={open}
                    handleClose={() => setOpen(false)}
                    title="Perform Promotion"
                />
            }
        </>
    );
}