import { importData } from "../../../types/bulk/bulkOperations";
import DropZone from "../../../components/dropzone/DropZone";
import { useValidation } from "../template_validation/useValidation";
import { useImportData } from "./useImportData";
import { modules } from "../../../types/common/moduleTypes";
import ModalComponent from "../../../components/modal/Modal";
import { useEffect, useState } from "react";
import ModalProgress from "../progress/interactiveProgress";

export default function ProcessImport(props: importData) {
    const { module, label, onError } = props
    const [progress, setProgress] = useState({ prorocess: "import", progress: 0, buffer: 0 })
    const { importData } = useImportData({ setProgress, onError })
    const UseValidation = new useValidation()
    const [open, setOpen] = useState(false)
    const [openPogress, setOpenProgress] = useState(false)

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

    const onValidation = async (file: File) => {
        UseValidation.setModule(module as unknown as modules)

        await UseValidation.validation(file[0])
            .then((resp) => {
                void importData({ ...props, excelData: resp })
            })
            .catch((error) => {
                onError('Import Error: ' + error)
            })
    }

    return (
        <>
            <a style={{ width: "100%", cursor: "pointer", padding: "5px", fontSize: "13px" }} onClick={(e) => {
                e.preventDefault()
                setOpen(true)
            }}>
                {label}
            </a>

            <ModalComponent
                children={<DropZone accept='.csv,.xlsx' onSave={(file) => onValidation(file)} />}
                handleClose={() => { setOpen(false) }}
                open={open}
                title=""
            />

            <ModalProgress
                progress={progress}
                open={openPogress}
                setOpen={setOpenProgress}
                module={module}
            />
        </>
    )
}