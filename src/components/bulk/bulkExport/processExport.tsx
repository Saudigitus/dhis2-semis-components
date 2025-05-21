import { ExportData } from "../../../types/bulk/bulkOperations"
import { useState, useEffect } from 'react'
import ModalExportEmpty from "../modal/modalExport";
import { useExportData } from "./exportData";
import ModalProgress from "../progress/interactiveProgress";
import { Modules } from "dhis2-semis-types";

export default function ProcessExport(props: ExportData) {
    const { empty = false, label, module, Form, stagesToExport } = props
    const [open, setOpen] = useState(false)
    const [openPogress, setOpenProgress] = useState(false)
    const [progress, setProgress] = useState({ prorocess: "export", progress: 0, buffer: 0 })
    const { exportData } = useExportData({ ...props, setProgress })

    useEffect(() => {
        if (progress.progress > 0) {
            setOpen(false)
            setOpenProgress(true)
        }

        if (progress.progress >= 100) {
            setOpenProgress(false)
            setProgress({ prorocess: "export", progress: 0, buffer: 0 })
        }
    }, [progress.progress])

    return (
        <>
            <a style={{ width: "100%", cursor: "pointer", padding: "5px" }} onClick={async (e) => {
                e.preventDefault()
                if (empty || module === Modules.Attendance) setOpen(true)
                else await exportData({})
            }}>
                {label}
            </a>

            <ModalExportEmpty
                onSubmit={exportData}
                open={open}
                setOpen={setOpen}
                module={module}
                Form={Form}
            />

            <ModalProgress
                progress={progress}
                open={openPogress}
                module={module as unknown as string}
                setOpen={setOpenProgress}
            />
        </>
    )
}