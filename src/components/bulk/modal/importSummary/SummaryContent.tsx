import React, { useState } from 'react';
import { DataTable, DataTableBody, DataTableCell, DataTableRow, } from '@dhis2/ui'
import ErrorDetailsTable from './ErrorDetailsTable';
import { TranslationState } from '../../../../schemas/translationsSchema';
import { useRecoilValue } from 'recoil';

interface SummaryTableProps {
    displayData: Record<string, any>[]
    doneProcessing: boolean
    programConfig: any
}

export const SummaryTable = (props: SummaryTableProps): React.ReactElement => {
    const i18n = useRecoilValue(TranslationState) as any
    const { displayData, doneProcessing, programConfig } = props
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

        for (const section of Object?.values(item)) {
            if (typeof section === 'object' && section !== null) {
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
                        <th style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>Action</th>
                        {
                            att?.map((x: any) => <th key={x.id} style={{ textAlign: "center", background: "#eee", fontSize: "15px", padding: "10px", fontWeight: "400" }}>{x?.displayName}</th>)
                        }
                    </tr>
                </thead>
                <DataTableBody>
                    {
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
                            <DataTableCell>{i18n.t('No records to display!')}</DataTableCell>
                        </DataTableRow>
                    }
                </DataTableBody>
            </DataTable >

        </>)
}
