import React, { useState } from "react";
import { IconCheckmarkCircle16, Tag, ModalActions, Button, ButtonStrip } from "@dhis2/ui";
import WithPadding from "../../../template/WithPadding";
import styles from "../modal.module.css";
import { type ButtonActionProps } from "../../../../types/buttons/ButtonActions";
import Title from "../../../text/Text";
import { Collapse, LinearProgress } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import SummaryCards from "./SummaryCards";
import SummaryDetails from "./SummaryDetails";

interface ModalContentProps {
    setOpen: (value: boolean) => void
    invalidRecords: any[]
    validRecords: any[]
    programConfig: any
    onSubmit: (args: "VALIDATE" | "COMMIT") => any
    progress: any
    stats: { stats: { ignored: number, created: number, updated: number, total: number }, errorDetails: any[] }
}

const ModalSummaryContent = (props: ModalContentProps): React.ReactElement => {
    const { setOpen, invalidRecords, validRecords, programConfig, onSubmit, progress, stats } = props;
    const [showDetails, setShowDetails] = useState(false)
    const [doneProcessing, setDoneProcessing] = useState({ validate: false, commit: false })

    const handleShowDetails = () => { setShowDetails(!showDetails); }

    const modalActions: ButtonActionProps[] = [
        {
            label: "Dry Run",
            loading: false,
            disabled: validRecords?.length === 0 || doneProcessing.validate || doneProcessing.commit,
            onClick: async () => {
                await onSubmit("VALIDATE").then((e) => {
                    console.log(e, 'dry run resp')
                    setDoneProcessing({ validate: true, commit: false })
                }).catch((e) => {
                    console.log(e, 'dry run error')
                    setDoneProcessing({ validate: true, commit: false })
                })
            },
        },
        {
            label: "Import data",
            primary: true,
            loading: false,
            disabled: doneProcessing.commit || (validRecords?.length === 0),
            onClick: () => {
                onSubmit("COMMIT").then((e) => {
                    console.log(e, 'submit resp')
                    setDoneProcessing((done: any) => ({ ...done, commit: true }))
                }).catch((e) => {
                    console.log(e, 'submit error')
                    setDoneProcessing((done: any) => ({ ...done, commit: true }))
                })
            },
        },
        {
            label: "Close",
            disabled: false,
            loading: false,
            onClick: () => {
                setOpen(false)
            }
        }
    ];

    function Actions() {
        return (
            <ModalActions>
                <ButtonStrip end >
                    {
                        modalActions.map((action, i) => (
                            <Button
                                key={i}
                                {...action}
                            >
                                {action.label}
                            </Button>
                        ))
                    }
                </ButtonStrip>
            </ModalActions>
        )
    }

    return (
        <>
            <Tag positive icon={< IconCheckmarkCircle16 />} className={styles.tagContainer} >  <Title style={{ fontSize: "15px", fontWeight: "400" }} label={`Import data preview `} type="title" /></Tag>

            <WithPadding />
            <Title style={{ fontSize: "18px" }} label={`Summary`} type="title" />
            <WithPadding />

            <SummaryCards stats={stats} duplicateRecs={[]} invalidRecs={invalidRecords} validRecs={validRecords} doneProcessing={doneProcessing.commit || doneProcessing.validate} />

            <WithPadding />
            <ButtonStrip>
                <Button small icon={<InfoOutlined className={styles.infoIcon} />} onClick={handleShowDetails} > More details </Button>
            </ButtonStrip>

            <WithPadding />
            <Collapse in={showDetails}>
                <div className={styles.detailsContainer}>
                    <SummaryDetails programConfig={programConfig} doneProcessing={doneProcessing.commit || doneProcessing.validate} dupliRecords={[]} invalidRecords={invalidRecords} validRecords={validRecords} />
                </div>
            </Collapse>
            {progress?.progress != null && doneProcessing.validate && <LinearProgress />}
            <Actions />
        </>
    );
}

export default ModalSummaryContent;
