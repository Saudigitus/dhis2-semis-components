import React, { useEffect, useState } from "react";
import { ModalActions, Button, ButtonStrip, NoticeBox } from "@dhis2/ui";
import WithPadding from "../../../template/WithPadding";
import styles from "../modal.module.css";
import { type ButtonActionProps } from "../../../../types/buttons/ButtonActions";
import Title from "../../../text/Text";
import SummaryCards from "./SummaryCards";
import SummaryDetails from "./SummaryDetails";
import { Collapse, LinearProgress } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import ErrorDetailsTable from "./ErrorDetailsTable";
import { TranslationState } from "../../../../schemas/translationsSchema";
import { useRecoilValue } from "recoil";
import { TabBar, Tab } from '@dhis2/ui'
import { summaryNotice } from "../../../../utils/common/summaryNotice";

interface ModalContentProps {
    setOpen: (value: boolean) => void
    invalidRecords: any[]
    validRecords: any[]
    programConfig: any
    onSubmit: (args: "VALIDATE" | "COMMIT") => any
    onClose?: () => any
    module: string
    updating?: boolean
    stats: { stats: { ignored: number, created: number, updated: number, total: number }, errorDetails: any[], byType: [], warningDetails: [], exceptions?: any[] }
}

const ModalSummaryContent = (props: ModalContentProps): React.ReactElement => {
    const { setOpen, invalidRecords, validRecords, programConfig, onSubmit, onClose, module, updating = false, stats } = props;
    const [showDetails, setShowDetails] = useState(false)
    const [tab, setSelectedTab] = useState<any>({ id: 'byType', data: stats?.byType })
    const [load, setLoading] = useState(false)
    const [doneProcessing, setDoneProcessing] = useState<any>({ validate: false, commit: false })
    const i18n = useRecoilValue(TranslationState) as any

    const handleShowDetails = () => { setShowDetails(!showDetails); }

    // The server refused something (ignored records, errors or an exception).
    const refused = (runStats: any) =>
        (runStats?.stats?.ignored ?? 0) > 0 || (runStats?.errorDetails?.length ?? 0) > 0 || (runStats?.exceptions?.length ?? 0) > 0

    // A dry run that the server refused blocks the import until a corrected file is uploaded
    // (a new upload opens a new summary).
    const dryRunFailed = doneProcessing.validate && refused(stats)

    useEffect(() => {
        setDoneProcessing({ validate: false, commit: false })
    }, [])

    useEffect(() => {
        setSelectedTab((
            doneProcessing?.commit ? { id: 'byType', data: stats?.byType }
                : !doneProcessing?.commit && stats?.errorDetails?.length > 0 ? { data: stats?.errorDetails, id: "errors" }
                    : stats?.warningDetails?.length > 0 ? { data: stats?.warningDetails, id: "warning" } : {} as any
        ))
    }, [stats])


    // Title and message say the same thing for the step shown (check, dry run or import).
    const { hasErrors, message } = summaryNotice({
        validated: doneProcessing.validate,
        committed: doneProcessing.commit,
        dryRunFailed,
        invalidRows: invalidRecords?.length ?? 0,
        ignored: stats?.stats?.ignored ?? 0,
        exceptions: stats?.exceptions?.length ?? 0,
    })
    const noticeMessage = `${i18n.t(message)}`

    const modalActions: ButtonActionProps[] = [
        {
            label: `${i18n.t("Dry Run")}`,
            loading: false,
            disabled: stats?.exceptions?.length > 0 || validRecords?.length === 0 || doneProcessing.validate || doneProcessing.commit,
            onClick: async () => {
                setLoading(true)
                await onSubmit("VALIDATE").then(() => {
                    setDoneProcessing({ validate: true, commit: false })
                }).finally(() => setLoading(false))
            },
        },
        {
            label: `${i18n.t("Import data")}`,
            primary: true,
            loading: false,
            disabled: stats?.exceptions?.length > 0 || doneProcessing.commit || validRecords?.length === 0 || dryRunFailed,
            onClick: async () => {
                // Nothing is saved unless the server accepts every row: without a dry run, one runs
                // first, and when the server refuses something the import stops and shows why.
                // So a person is never saved without the enrollment that the server refused.
                if (!doneProcessing.validate) {
                    const dryRun = await onSubmit("VALIDATE")
                    setDoneProcessing({ validate: true, commit: false })
                    if (refused(dryRun)) return
                }
                onSubmit("COMMIT").then(() => {
                    setDoneProcessing((done: any) => ({ ...done, commit: true }))
                })
            },
        },
        {
            label: `${i18n.t("Close")}`,
            disabled: false,
            loading: false,
            onClick: () => {
                if (onClose && doneProcessing.commit) onClose()
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
            <NoticeBox
                title={hasErrors ? `${i18n.t("Errors were found!")}` : `${i18n.t('No errors!')}`}
                warning={hasErrors}
                valid={!hasErrors}
            >
                {noticeMessage}
            </NoticeBox >

            <WithPadding />
            <Title style={{ fontSize: "18px" }} label={`${i18n.t('Summary')}`} type="title" />
            <WithPadding />

            <SummaryCards module={module} updating={updating} stats={stats} invalidRecs={invalidRecords} validRecs={validRecords} doneProcessing={doneProcessing.commit || doneProcessing.validate} dryRun={doneProcessing.validate && !doneProcessing.commit} />

            <WithPadding />
            <ButtonStrip>
                <Button small icon={<InfoOutlined className={styles.infoIcon} />} onClick={handleShowDetails} > More details </Button>
            </ButtonStrip>

            <WithPadding />
            <Collapse in={showDetails}>
                <div className={styles.detailsContainer}>
                    {((doneProcessing?.commit || doneProcessing?.validate) && stats?.byType?.length > 0) &&
                        <>
                            <WithPadding />
                            <TabBar>
                                {doneProcessing?.commit &&
                                    <Tab onClick={() => { setSelectedTab({ data: stats?.byType, id: "byType" }) }} selected={tab.id === 'byType'}>
                                        {`${i18n.t('Summary by tracker type')}`}
                                    </Tab>
                                }
                                {stats?.errorDetails?.length > 0 &&
                                    <Tab
                                        onClick={() => { setSelectedTab({ data: stats?.errorDetails, id: "errors" }) }}
                                        selected={tab.id === 'errors'}
                                    >
                                        {`${i18n.t('Error details')}`}
                                    </Tab>
                                }
                                {stats?.warningDetails?.length > 0 &&
                                    <Tab
                                        onClick={() => { setSelectedTab({ data: stats?.warningDetails, id: "warning" }) }}
                                        selected={tab.id === 'warning'}
                                    >
                                        {`${i18n.t('Warning details')}`}
                                    </Tab>
                                }
                            </TabBar>
                            <WithPadding />
                            <ErrorDetailsTable data={tab.data} />
                            <WithPadding />
                        </>
                    }
                    {
                        ((invalidRecords?.length + validRecords?.length) > 0 && !doneProcessing?.commit && !doneProcessing?.validate) &&
                        <>
                            <WithPadding p="0px 0 -50px 0" />
                            <SummaryDetails module={module} stats={stats} programConfig={programConfig} doneProcessing={doneProcessing?.commit || doneProcessing?.validate} invalidRecords={invalidRecords} validRecords={validRecords} />
                        </>
                    }
                </div>
            </Collapse >
            {load && <LinearProgress />}
            <Actions />
        </>
    );
}

export default ModalSummaryContent;
