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

interface ModalContentProps {
    setOpen: (value: boolean) => void
    invalidRecords: any[]
    validRecords: any[]
    programConfig: any
    onSubmit: (args: "VALIDATE" | "COMMIT") => any
    onClose?: () => any
    module: string
    stats: { stats: { ignored: number, created: number, updated: number, total: number }, errorDetails: any[], byType: [], exceptions?: any[] }
}

const ModalSummaryContent = (props: ModalContentProps): React.ReactElement => {
    const { setOpen, invalidRecords, validRecords, programConfig, onSubmit, stats, onClose, module } = props;
    const [showDetails, setShowDetails] = useState(false)
    const [load, setLoading] = useState(false)
    const [doneProcessing, setDoneProcessing] = useState<any>({ validate: false, commit: false })
    const i18n = useRecoilValue(TranslationState) as any

    const handleShowDetails = () => { setShowDetails(!showDetails); }

    useEffect(() => {
        setDoneProcessing({ validate: false, commit: false })
    }, [])

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
            disabled: stats?.exceptions?.length > 0 || doneProcessing.commit || validRecords?.length === 0,
            onClick: () => {
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
                title={((stats?.stats?.ignored ?? 0) + invalidRecords?.length + stats?.exceptions?.length) > 0 ? `${i18n.t("Errors were found!")}` : `${i18n.t('No errors!')}`}
                warning={((stats?.stats?.ignored ?? 0) + invalidRecords?.length + stats?.exceptions?.length) > 0}
                valid={((stats?.stats?.ignored ?? 0) + invalidRecords?.length + stats?.exceptions?.length) == 0}
            >
                {((stats?.stats?.ignored ?? 0) + invalidRecords?.length + stats?.exceptions?.length) > 0 ?
                    doneProcessing.validate ?
                        `${i18n.t("Erros were found, please review your file!")}` :
                        (invalidRecords?.length > 0 || stats?.exceptions?.length) ? `${i18n.t("Invalid records were found, please review your file!")}` :
                            `${i18n.t("Occurred errors during the import process, please review your file!")}`
                    : doneProcessing.commit ?
                        `${i18n.t("Date imported successfully!")}` :
                        doneProcessing.validate ?
                            `${i18n.t("No errors were found during dry run process, you can proceed with the import.")}` :
                            `${i18n.t("No errors were found during file validation process, you can proceed with the dry run/import.")}`

                }
            </NoticeBox >

            <WithPadding />
            <Title style={{ fontSize: "18px" }} label={`${i18n.t('Summary')}`} type="title" />
            <WithPadding />

            <SummaryCards module={module} stats={stats} invalidRecs={invalidRecords} validRecs={validRecords} doneProcessing={doneProcessing.commit || doneProcessing.validate} />

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
                            <Title style={{ fontSize: "18px" }} label={`${i18n.t("Summary by tracker type")}`} type="subtitle" />
                            <WithPadding />
                            <ErrorDetailsTable data={stats?.byType} />
                            <WithPadding />
                        </>
                    }
                    {
                        ((stats?.stats?.ignored ?? 0) + invalidRecords?.length + ((doneProcessing?.commit || doneProcessing?.validate) ? 0 : validRecords?.length)) > 0 &&
                        <>
                            <WithPadding p="0px 0 -50px 0" />
                            <SummaryDetails stats={stats} programConfig={programConfig} doneProcessing={doneProcessing?.commit || doneProcessing?.validate} invalidRecords={invalidRecords} validRecords={validRecords} />
                        </>
                    }
                </div>
            </Collapse>
            {load && <LinearProgress />}
            <Actions />
        </>
    );
}

export default ModalSummaryContent;
