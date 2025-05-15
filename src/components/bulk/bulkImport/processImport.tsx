import { importData } from "../../../types/bulk/bulkOperations";
import DropZone from "../../../components/dropzone/DropZone";
import { useImportData } from "./useImportData";
import ModalComponent from "../../../components/modal/Modal";
import { useEffect, useState } from "react";
import ModalProgress from "../progress/interactiveProgress";
import { useValidateFile, useValidation } from "dhis2-semis-functions";
// import program from "../../../../program.json";
import ModalSummaryContent from "../modal/importSummary/importSummary";

export default function ProcessImport(props: importData) {
    const { label, onError, title, updating, programConfig, module } = props
    const [progress, setProgress] = useState({ prorocess: "import", progress: 0, buffer: 0 })
    const UseValidation = new useValidation()
    const [open, setOpen] = useState(false)
    const [excelData, serExcelData] = useState<any>({ mapping: [], module: "" })
    const { importData } = useImportData({ setProgress, onError })
    const [openStats, setOpenStats] = useState(false)
    const [openPogress, setOpenProgress] = useState(false)
    const { validador, invalidRecords, validRecords, loader } = useValidateFile(programConfig, updating ? 'UPDATE' : "POST")

    useEffect(() => {
        if (progress.progress > 0) {
            setOpen(false)
            setOpenProgress(true)
        }

        if (progress.progress >= 100) {
            setOpenProgress(false)
            setProgress({ prorocess: "import", progress: 0, buffer: 0 })
        }
    }, [progress.progress])

    const onSubmit = async (importMode: "VALIDATE" | "COMMIT") => {
        await importData({ ...props, ...excelData, importMode })
    }

    const onValidation = async (file: File) => {
        UseValidation.setModule(module as unknown as any)

        await UseValidation.validation(file[0])
            .then((resp) => {
                const { mapping, module } = resp
                validador({ module, data: mapping }).then(() => {
                    setOpen(false)
                    setOpenStats(true)
                })
                serExcelData(resp)
            })
            .catch((error) => {
                onError('Import Error: ' + error)
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
                children={<DropZone loading={loader} accept='.csv,.xlsx' onSave={(file) => onValidation(file)} />}
                handleClose={() => { setOpen(false) }}
                open={open}
                title={title}
            />

            {openStats && <ModalComponent
                children={<ModalSummaryContent progress={progress} onSubmit={onSubmit} programConfig={programConfig} setOpen={setOpenStats} invalidRecords={invalidRecords} validRecords={validRecords} />}
                handleClose={() => { setOpenStats(false) }}
                open={openStats}
            />}

            <ModalProgress
                progress={progress}
                open={openPogress}
                setOpen={setOpenProgress}
            />
        </div>
    )
}