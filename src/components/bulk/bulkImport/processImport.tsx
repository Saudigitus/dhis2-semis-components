import { importData } from "../../../types/bulk/bulkOperations";
import DropZone from "../../../components/dropzone/DropZone";
import { useImportData } from "./useImportData";
import ModalComponent from "../../../components/modal/Modal";
import { useEffect, useState } from "react";
import ModalProgress from "../progress/interactiveProgress";
import { useValidateFile, useValidation } from "dhis2-semis-functions";
import ModalSummaryContent from "../modal/importSummary/importSummary";

export default function ProcessImport(props: importData) {
    const { label, onError, title, updating, programConfig, module } = props
    const [progress, setProgress] = useState({ prorocess: "import", progress: 0, buffer: 0 })
    const UseValidation = new useValidation()
    const [open, setOpen] = useState(false)
    const [stats, setStats] = useState<any>({ stats: { ignored: 0, created: 0, updated: 0, total: 0 }, errorDetails: [], exceptions: [], byType: [] })
    const [excelData, setExcelData] = useState<any>({ mapping: [], module: "" })
    const [openPogress, setOpenProgress] = useState(false)
    const [openStats, setOpenStats] = useState(false)
    const { importData } = useImportData({ setProgress, onError, stats, setStats, setOpenProgress })
    const { validador, invalidRecords, validRecords, loader } = useValidateFile(programConfig, updating ? 'UPDATE' : "POST")

    useEffect(() => {
        if (progress.progress > 0) {
            setOpen(false)
            setOpenProgress(true)
        }

        if (progress.progress >= 100) {
            setProgress({ prorocess: "import", progress: 0, buffer: 0 })
            setOpenProgress(false)
        }
    }, [progress.progress])

    useEffect(() => {
        if (!open) setOpenProgress(false)
    }, [open])

    const onSubmit = async (importMode: "VALIDATE" | "COMMIT") => await importData({ ...props, excelData: excelData, importMode })

    const onValidation = async (file: File) => {
        UseValidation.setModule(module as unknown as any)

        await UseValidation.validation(file[0])
            .then((resp) => {
                const { mapping, module } = resp
                console.log(mapping)
                validador({ module, data: mapping }).then(() => {
                    setOpen(false)
                    setOpenStats(true)
                })
                setExcelData(resp)
            })
            .catch((error) => {
                onError(error)
            })
    }

    return (
        <div>
            <a style={{ width: "100%", cursor: "pointer", padding: "5px" }} onClick={(e) => {
                e.preventDefault()
                setOpen(true)
            }}>
                {label}
            </a>

            <ModalComponent
                children={<DropZone onCancel={() => setOpen(false)} loading={loader} accept='.csv,.xlsx' onSave={(file) => onValidation(file)} />}
                handleClose={() => { setOpen(false) }}
                open={open}
                title={title}
            />

            {openStats && <ModalComponent
                children={
                    <ModalSummaryContent
                        onSubmit={onSubmit}
                        programConfig={programConfig}
                        setOpen={setOpenStats}
                        invalidRecords={invalidRecords}
                        validRecords={validRecords}
                        stats={stats}
                    />
                }
                handleClose={() => { setOpenStats(false) }}
                open={openStats}
            />}

            {openPogress && <ModalProgress
                progress={progress}
                open={openPogress}
                setOpen={setOpenProgress}
            />}
        </div>
    )
}