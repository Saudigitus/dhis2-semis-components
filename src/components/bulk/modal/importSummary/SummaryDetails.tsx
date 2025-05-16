import React, { useEffect, useState } from "react";
import { TabBar, Tab } from '@dhis2/ui'
import { SummaryTable } from "./SummaryContent";
import Pagination from "../../../../components/table/components/pagination/Pagination";

const SummaryDetails = ({ invalidRecords, doneProcessing, dupliRecords, validRecords, programConfig, stats }: { stats: any, programConfig: any, dupliRecords: any, validRecords: any, invalidRecords: any, doneProcessing: boolean }): React.ReactElement => {
    const [data, setData] = useState<any>([])
    const [activeTab, setActiveTab] = useState("valid")
    const [pagination, setPagination] = useState<any>({ valid: { page: 1, pageSize: 10 }, invalid: { page: 1, pageSize: 10 }, duplicates: { page: 1, pageSize: 10 } });
    const currentPage = pagination[activeTab]?.page;
    const tabPageSize = pagination[activeTab]?.pageSize;
    const dataCont = { valid: doneProcessing ? stats?.errorDetails : validRecords, invalid: invalidRecords, duplicates: dupliRecords }

    const handlePageChange = (newPage: number) => {
        setPagination((prev: any) => ({
            ...prev,
            [activeTab]: { ...prev[activeTab], page: newPage }
        }));
    };

    useEffect(() => {
        setData(() => (
            [...(dataCont?.[activeTab]?.slice((currentPage - 1) * tabPageSize, currentPage * tabPageSize) ?? [])]
        ));
    }, [activeTab, stats, pagination])


    return (
        <>
            {!doneProcessing && <TabBar>
                <Tab onClick={() => { setActiveTab('valid') }} selected={activeTab === 'valid'}>
                    {validRecords?.lenfth}<br /> New Records
                </Tab>
                <Tab onClick={() => { setActiveTab('invalid') }} selected={activeTab === 'invalid'}>
                    {invalidRecords?.lenfth}<br /> Invalid Records
                </Tab>
            </TabBar>}

            <br />

            <div style={{ height: doneProcessing ? "200px" : "137px", overflow: "auto" }}>

                <SummaryTable
                    stats={stats?.stats}
                    displayData={data}
                    doneProcessing={doneProcessing}
                    programConfig={programConfig}
                />

                <br />
                {(dataCont?.[activeTab]?.length > 0 && !doneProcessing) &&
                    <Pagination
                        page={currentPage}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={() => { }}
                        rowsPerPage={tabPageSize}
                        loading={false}
                        disablePreviousPage={pagination?.[activeTab]?.page === 1}
                        disableNextPage={pagination?.[activeTab]?.page === pagination?.[activeTab]?.totalPages}
                        rowsPerPages={[{ value: 10, label: "10" }]}
                    />
                }
            </div>
        </>
    )
}

export default SummaryDetails;
