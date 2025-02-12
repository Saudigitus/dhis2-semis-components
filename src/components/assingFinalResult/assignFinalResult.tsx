import { useGetDataElements, useGetSectionTypeLabel, useUrlParams } from "dhis2-semis-functions";
import { useDataStoreKey } from "../../hooks/dataStore/useDataStoreKey";
import { useState } from "/react";
import { NoticeBox, Button, IconAddCircle24 } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import CustomForm from "../form/form";
import ModalComponent from "../modal/Modal";

export default function AsssignFinalResult({ selected, Form }: any) {
    const { urlParameters } = useUrlParams()
    const { sectionType } = urlParameters()
    const { "final-result": fr } = useDataStoreKey({ sectionType: sectionType as unknown as "student" | "staff" })
    const { sectionName } = useGetSectionTypeLabel()
    const { dataElements } = useGetDataElements({ programStageId: fr.programStage, type: "programStageSection" })
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => {
                setOpen(true);
            }} icon={<IconAddCircle24 />}
            >
                <span>Search {sectionName?.toLowerCase()}</span>
            </Button >

            {
                open && <ModalComponent
                    children={<WithPadding>
                        <NoticeBox title={`WARNING! ${selected.length} rows will be affected`} warning>
                            No one will be able to access this program. Add some Organisation Units to the access list.
                        </NoticeBox>
                        <CustomForm
                            Form={Form}
                            formFields={[
                                {
                                    storyBook: false,
                                    name: "Final Result",
                                    description: "Student final result",
                                    fields: dataElements
                                }
                            ]}
                            storyBook={false}
                        />
                    </WithPadding>}
                    open={open}
                    handleClose={() => setOpen(false)}
                    title="Assign Final Result"
                />
            }
        </>
    );
}