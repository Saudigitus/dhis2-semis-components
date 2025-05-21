import {
    DataTable,
    DataTableHead,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'

export default function ErrorDetailsTable({ data }: { data: any }) {
    const keys: any = Object?.keys(data?.[0])

    return (
        <>
            <DataTable>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableCell colSpan="3" error>
                            Validation Errors
                        </DataTableCell>
                    </DataTableRow>
                    <DataTableRow>
                        {
                            keys?.map((x) => <th style={{
                                textAlign: "center",
                                background: "#eee",
                                fontSize: "15px",
                                padding: "10px",
                                fontWeight: "400",
                                textTransform: "capitalize"
                            }}>{x}</th>)
                        }
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    {
                        data?.map((row: any) => {
                            return (
                                <DataTableRow>
                                    {keys.map((x: any) => {
                                        return (
                                            <DataTableCell align="center">{row?.[x]}</DataTableCell>
                                        )
                                    })}
                                </DataTableRow>
                            )
                        })
                    }
                </DataTableBody>
            </DataTable>
        </>
    )
}
