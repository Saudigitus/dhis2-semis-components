import React, { useState } from 'react';
import { DataTable, DataTableBody, DataTableCell, DataTableRow, } from '@dhis2/ui'
import ErrorDetailsTable from './ErrorDetailsTable';

interface SummaryRowProps {
    data: any
    reference: string
    tab: string
    index: number
}

export const SummaryRow = (props: SummaryRowProps): React.ReactElement => {
    const { data, tab, index } = props

    return (
        <DataTableRow >
            <DataTableCell align="center">{tab == 'invalidSheets' ? index + 1 : data?.ref}</DataTableCell>
            <DataTableCell align="center">{data?.sheet}</DataTableCell>
            {tab !== 'invalidSheets' && <>
                <DataTableCell align="center">{data?.school}</DataTableCell>
                <DataTableCell align="center">{data?.name}</DataTableCell>
            </>}
            <DataTableCell align="center">{tab == 'invalidSheets' ? data.description : data?.columns}</DataTableCell>
        </DataTableRow>
    )
}

interface SummaryTableProps {
    displayData: Record<string, any>[]
    activeTab: string
    doneProcessing: boolean
}

export const SummaryTable = (props: SummaryTableProps): React.ReactElement => {
    const { displayData, activeTab, doneProcessing } = props
    const [expanded, setExpanded] = useState<boolean>(false)
    const recordsName = activeTab === "new" ? "new records" : activeTab
    const stats: any = {}

    return (
        <>
            <DataTable>
                <thead>
                    <tr>
                        {
                            doneProcessing ?
                                <>
                                    <>
                                        <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}></th>
                                        <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Imported</th>
                                        <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Updated</th>
                                        <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Igonored</th>
                                    </>
                                </> :
                                <>
                                    <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Ref</th>
                                    <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Sheet</th>
                                    {
                                        activeTab == 'invalidSheets' ?
                                            <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Description</th>
                                            :
                                            <>
                                                <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Name</th>
                                                <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>School</th>
                                                <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>{activeTab === 'invalid' ? 'Invalid Records' : 'Valid Records'}</th>
                                            </>
                                    }
                                </>
                        }
                    </tr>
                </thead>
                <DataTableBody>
                    {
                        doneProcessing ?
                            <DataTableRow
                                expanded={expanded}
                                onExpandToggle={() => setExpanded(!expanded)}
                                expandableContent={<ErrorDetailsTable />}
                            >
                                <DataTableCell align="center">{stats.statsCount?.created}</DataTableCell>
                                <DataTableCell align="center">{stats.statsCount?.updated}</DataTableCell>
                                <DataTableCell align="center">{stats.statsCount?.ignored}</DataTableCell>
                            </DataTableRow>
                            :
                            displayData?.map((student, index) => {
                                return (
                                    <SummaryRow
                                        reference={`student-${student?.ref}`}
                                        data={student}
                                        index={index}
                                        tab={activeTab}
                                    />
                                )
                            })
                    }
                    {(displayData?.length === 0) &&
                        <DataTableRow>
                            <DataTableCell>{`No ${recordsName} to display!`}</DataTableCell>
                        </DataTableRow>
                    }
                </DataTableBody>
            </DataTable >

        </>)
}
