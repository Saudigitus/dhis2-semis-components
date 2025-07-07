import React, { useEffect, useState } from "react";
import { IconCheckmarkCircle16, Tag, ModalActions, Button, ButtonStrip } from "@dhis2/ui";
import WithPadding from "../../../template/WithPadding";
import styles from "../modal.module.css";
import { type ButtonActionProps } from "../../../../types/buttons/ButtonActions";
import Title from "../../../text/Text";
import SummaryCards from "./SummaryCards";
import SummaryDetails from "./SummaryDetails";
import { Collapse, LinearProgress } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { importSummary } from "../../../../utils/common/getImportSummary";
import summary from '../../../../summary.json'
import ErrorDetailsTable from "./ErrorDetailsTable";

interface ModalContentProps {
    setOpen: (value: boolean) => void
    invalidRecords: any[]
    validRecords: any[]
    programConfig: any
    onSubmit: (args: "VALIDATE" | "COMMIT") => any
    stats: { stats: { ignored: number, created: number, updated: number, total: number }, errorDetails: any[], byType: [] }
}

const ModalSummaryContent = (props: ModalContentProps): React.ReactElement => {
    const { setOpen, invalidRecords, validRecords, programConfig, onSubmit, stats } = props;
    const [showDetails, setShowDetails] = useState(false)
    const [load, setLoading] = useState(false)
    const [doneProcessing, setDoneProcessing] = useState({ validate: false, commit: false })

    const handleShowDetails = () => { setShowDetails(!showDetails); }

    const modalActions: ButtonActionProps[] = [
        {
            label: "Dry Run",
            loading: false,
            disabled: validRecords?.length === 0 || doneProcessing.validate || doneProcessing.commit,
            onClick: async () => {
                setLoading(true)
                await onSubmit("VALIDATE").then(() => {
                    setDoneProcessing({ validate: true, commit: false })
                }).catch(() => {
                    setDoneProcessing({ validate: true, commit: false })
                }).finally(() => setLoading(false))
            },
        },
        {
            label: "Import data",
            primary: true,
            loading: false,
            disabled: doneProcessing.commit || validRecords?.length === 0,
            onClick: () => {
                onSubmit("COMMIT").then(() => {
                    setDoneProcessing((done: any) => ({ ...done, commit: true }))
                }).catch(() => {
                    setDoneProcessing((done: any) => ({ ...done, commit: true }))
                })
            },
        },
        {
            label: "Close",
            disabled: false,
            loading: false,
            onClick: () => setOpen(false)
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

            <SummaryCards stats={stats} invalidRecs={invalidRecords} validRecs={validRecords} doneProcessing={doneProcessing.commit || doneProcessing.validate} />

            <WithPadding />
            <ButtonStrip>
                <Button small icon={<InfoOutlined className={styles.infoIcon} />} onClick={handleShowDetails} > More details </Button>
            </ButtonStrip>

            <WithPadding />
            <Collapse in={showDetails}>
                <div className={styles.detailsContainer}>
                    {(doneProcessing.commit || doneProcessing.validate) &&
                        <>
                            <WithPadding />
                            <Title style={{ fontSize: "18px" }} label={`Summary by tracker type`} type="subtitle" />
                            <WithPadding />
                            <ErrorDetailsTable data={stats?.byType} />
                            <WithPadding />
                        </>
                    }
                    <Title style={{ fontSize: "18px" }} label={`Errors list`} type="subtitle" />
                    <WithPadding p="10px 0 -50px 0" />
                    <SummaryDetails stats={stats} programConfig={programConfig} doneProcessing={doneProcessing.commit || doneProcessing.validate} invalidRecords={invalidRecords} validRecords={validRecords} />
                </div>
            </Collapse>
            {load && <LinearProgress />}
            <Actions />
        </>
    );
}

export default ModalSummaryContent;
