import { importData } from "../../../types/bulk/bulkOperations";
import DropZone from "../../../components/dropzone/DropZone";
import { useImportData } from "./useImportData";
import ModalComponent from "../../../components/modal/Modal";
import { useEffect, useState } from "react";
import ModalProgress from "../progress/interactiveProgress";
import { useValidateFile, useValidation } from "dhis2-semis-functions";
import program from "../../../../program.json";
import ModalSummaryContent from "../modal/importSummary/importSummary";
import Title from "../../text/Text";

export default function ProcessImport(props: importData) {
    const { module, label, onError, title, updating, programConfig } = props
    const [progress, setProgress] = useState({ prorocess: "import", progress: 0, buffer: 0 })
    // const { importData } = useImportData({ setProgress, onError })
    const UseValidation = new useValidation()
    const [open, setOpen] = useState(false)
    const [openStats, setOpenStats] = useState(false)
    const [openPogress, setOpenProgress] = useState(false)
    const { validador, invalidRecords, validRecords } = useValidateFile(program, 'UPDATE')

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
        UseValidation.setModule(module as unknown as any)

        await UseValidation.validation(file[0])
            .then((resp) => {
                const { mapping, module } = resp
                validador({ module, data: mapping }).then(() => {
                    setOpen(false)
                    setOpenStats(true)
                })
                // void importData({ ...props, excelData: resp })
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
                children={<DropZone accept='.csv,.xlsx' onSave={(file) => onValidation(file)} />}
                handleClose={() => { setOpen(false) }}
                open={open}
                title={title}
            />

            {openStats && <ModalComponent
                children={<ModalSummaryContent setOpen={setOpenStats} invalidRecords={invalidRecords} validRecords={validRecords} />}
                handleClose={() => { setOpenStats(false) }}
                open={openStats}
                title={<Title style={{ fontSize: "20px", fontWeight:"600" }} label={`Bulk ${module}`} type="title" />}
            />}

            <ModalProgress
                progress={progress}
                open={openPogress}
                setOpen={setOpenProgress}
            />
        </div>
    )
}