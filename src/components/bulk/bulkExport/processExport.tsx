import { ExportData } from "../../../types/bulk/bulkOperations"
import { useState, useEffect } from 'react'
import ModalExportEmpty from "../modal/modalExport";
import { useExportData } from "./exportData";
import ModalProgress from "../progress/interactiveProgress";
import { modules } from "../../../types/common/moduleTypes";

export default function ProcessExport(props: ExportData) {
    const { empty = false, orgUnitName, eventFilters, label, selectedSectionDataStore, module } = props
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
                if (empty || module === modules.attendance) setOpen(true)
                else await exportData({})
            }}>
                {label}
            </a>

            <ModalExportEmpty
                selectedSectionDataStore={selectedSectionDataStore}
                onSubmit={exportData}
                eventFilters={eventFilters}
                open={open}
                orgUnitName={orgUnitName}
                setOpen={setOpen}
                module={module}
            />

            <ModalProgress
                progress={progress}
                open={openPogress}
                setOpen={setOpenProgress}
            />
        </>
    )
}