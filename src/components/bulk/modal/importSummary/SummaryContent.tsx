import React, { useState } from 'react';
import { DataTable, DataTableBody, DataTableCell, DataTableRow, } from '@dhis2/ui'
import ErrorDetailsTable from './ErrorDetailsTable';
// import program from '../../../../program.json'

interface SummaryTableProps {
    displayData: Record<string, any>[]
    doneProcessing: boolean
    programConfig: any
    stats: any
}

export const SummaryTable = (props: SummaryTableProps): React.ReactElement => {
    const { displayData, doneProcessing, programConfig, stats } = props
    const [expanded, setExpanded] = useState<string>("")
    const att = [
        { displayName: "Ref", id: "ref" },
        ...programConfig?.programTrackedEntityAttributes
            ?.filter((x: any) => x.displayInList)
            ?.map((x: any) => x.trackedEntityAttribute)
    ]
    const attributeIds = att?.map((attr: any) => attr.id);

    const flatArray = displayData?.map(item => {
        const flatObj = {};

        if (!doneProcessing) {
            for (const section of Object?.values(item)) {
                for (const [key, value] of Object?.entries(section)) {
                    if (attributeIds.includes(key) || key === "ref") {
                        flatObj[key] = value;
                    }
                }
            }
        }

        flatObj['errors'] = [...(item?.warnings ?? []), ...(item?.errors ?? [])]
        return flatObj;
    });


    return (
        <>
            <DataTable>
                <thead>
                    <tr>
                        {
                            doneProcessing ?
                                <>
                                    <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}></th>
                                    <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Imported</th>
                                    <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Updated</th>
                                    <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Igonored</th>
                                </> :
                                <>
                                    <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Action</th>
                                    {
                                        att?.map((x: any) => <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>{x?.displayName}</th>)
                                    }
                                </>
                        }
                    </tr>
                </thead>
                <DataTableBody>
                    {
                        doneProcessing ?
                            <DataTableRow
                                expanded={expanded === 'done'}
                                onExpandToggle={() => setExpanded("done")}
                                expandableContent={<ErrorDetailsTable data={displayData} />}
                            >
                                <DataTableCell align="center">{stats?.created}</DataTableCell>
                                <DataTableCell align="center">{stats?.updated}</DataTableCell>
                                <DataTableCell align="center">{stats?.ignored}</DataTableCell>
                            </DataTableRow>
                            :
                            flatArray?.map((data: any, index) => {
                                return (
                                    <DataTableRow
                                        expanded={expanded === index.toString()}
                                        onExpandToggle={() => {
                                            if (data?.errors?.length > 0) {
                                                if (expanded == index.toString())
                                                    setExpanded(null)
                                                else setExpanded(index.toString())
                                            }
                                        }}
                                        expandableContent={<ErrorDetailsTable data={data?.errors} />}
                                    >
                                        {att.map((x: any) => {
                                            return (
                                                <DataTableCell align="center">{data?.[x.id]}</DataTableCell>
                                            )
                                        })}
                                    </DataTableRow>
                                )
                            })
                    }
                    {(displayData?.length === 0) &&
                        <DataTableRow>
                            <DataTableCell>{`No records to display!`}</DataTableCell>
                        </DataTableRow>
                    }
                </DataTableBody>
            </DataTable >

        </>)
}
