import React, { useState, useEffect } from "react";
import { IconCheckmarkCircle16, Tag, ModalActions, Button, ButtonStrip } from "@dhis2/ui";
import WithPadding from "../../../template/WithPadding";
import styles from "../modal.module.css";
import { type ButtonActionProps } from "../../../../types/buttons/ButtonActions";
import Title from "../../../text/Text";
import { Collapse } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import SummaryCards from "./SummaryCards";
import SummaryDetails from "./SummaryDetails";
import useUploadEvents from "../../../../hooks/events/useUploadEvents";
import { LinearProgress } from "@material-ui/core";

interface ModalContentProps {
    setOpen: (value: boolean) => void
    summaryData: any
    sheetData: {
        attendanceEvents: any[],
        trackedEntityIds: {
            tei: string,
            enrollment: string
        }[],
        dateRange: {
            sDate: Date,
            eDate: Date
        }
    },
    setOpenDragNDrop: (value: boolean) => void
}

const ModalSummaryContent = (props: ModalContentProps): React.ReactElement => {
    const { setOpen, summaryData, sheetData, setOpenDragNDrop } = props;
    const [showDetails, setShowDetails] = useState(false)
    const [doneProcessing, setDoneProcessing] = useState({ validate: false, commit: false })

    const handleShowDetails = () => { setShowDetails(!showDetails); }

    const modalActions: ButtonActionProps[] = [
        {
            label: "Dry Run",
            loading: false,
            disabled: summaryData?.summary?.new?.length === 0 || doneProcessing.validate || doneProcessing.commit,
            onClick: () => {
                setDoneProcessing({ validate: true, commit: false })
            },
            // className: progress?.progress != null && styles.remove
        },
        {
            label: "Import attendance data",
            primary: true,
            loading: false,
            disabled: doneProcessing.commit || (summaryData?.summary?.new?.length === 0),
            onClick: () => {
                setDoneProcessing((done: any) => ({ ...done, commit: true }))
            },
            // className: progress?.progress != null && styles.remove
        },
        {
            label: "Close",
            disabled: false,
            loading: false,
            onClick: () => {
                setOpen(false)
                setOpenDragNDrop(false)
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
            <Tag positive icon={< IconCheckmarkCircle16 />} className={styles.tagContainer} > Attendance import preview </Tag>

            < WithPadding />
            <Title label={`Import Summary`} type="title" />
            < WithPadding />

            <SummaryCards doneProcessing={doneProcessing.commit || doneProcessing.validate} {...summaryData} />

            < WithPadding />
            <ButtonStrip>
                <Button small icon={< InfoOutlined className={styles.infoIcon} />} onClick={handleShowDetails} > More details </Button>
            </ButtonStrip>

            < WithPadding />
            <Collapse in={showDetails}>
                <div className={styles.detailsContainer}>
                    <SummaryDetails doneProcessing={doneProcessing.commit || doneProcessing.validate} summaryData={summaryData} />
                </div>
            </Collapse>
            {/* {progress?.progress != null && doneProcessing.validate && <LinearProgress />} */}
            <Actions />
        </>
    );
}

export default ModalSummaryContent;
