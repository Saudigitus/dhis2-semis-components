import React, { useEffect, useState } from "react";
import { TabBar, Tab } from '@dhis2/ui'
import { SummaryTable } from "./SummaryContent";

const SummaryDetails = ({ summaryData, doneProcessing }: { summaryData: any, doneProcessing: boolean }): React.ReactElement => {
    const [data, setData] = useState<any>([])
    const [activeTab, setActiveTab] = useState("new")
    const [pagination, setPagination] = useState<any>({ new: { page: 1, pageSize: 10 }, invalid: { page: 1, pageSize: 10 }, duplicates: { page: 1, pageSize: 10 } });
    const currentPage = pagination[activeTab]?.page;
    const tabPageSize = pagination[activeTab]?.pageSize;
    const newRecs = summaryData?.summary?.new?.reduce((sum: any, item: any) => sum + item.columns, 0);
    const invalid = summaryData?.summary?.invalid?.reduce((sum: any, item: any) => sum + item.columns, 0);

    const handlePageChange = (newPage: number) => {
        setPagination((prev: any) => ({
            ...prev,
            [activeTab]: { ...prev[activeTab], page: newPage }
        }));
    };

    useEffect(() => {
        setData((dados: any) => (
            [...(summaryData?.summary?.[activeTab]?.slice((currentPage - 1) * tabPageSize, currentPage * tabPageSize) ?? [])]
        ));
    }, [activeTab, summaryData, pagination])

    return (
        <>
            {!doneProcessing && <TabBar>
                <Tab onClick={() => { setActiveTab('new') }} selected={activeTab === 'new'}>
                    {newRecs}<br /> New Records
                </Tab>
                <Tab onClick={() => { setActiveTab('invalid') }} selected={activeTab === 'invalid'}>
                    {invalid}<br /> Invalid Records
                </Tab>
                <Tab onClick={() => { setActiveTab('duplicates') }} selected={activeTab === 'duplicates'}>
                    {summaryData.summary?.duplicates?.length}<br /> Invalid Sheets
                </Tab>
            </TabBar>}

            <br />

            <div style={{ height: doneProcessing ? "200px" : "137px", overflow: "auto" }}>

                <SummaryTable
                    displayData={data}
                    activeTab={activeTab}
                    doneProcessing={doneProcessing}
                />

                <br />
                {/* {(summaryData.summary?.[activeTab]?.length > 0 && !doneProcessing) &&
                    <Pagination
                        page={currentPage}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={() => { }}
                        rowsPerPage={tabPageSize}
                        loading={false}
                        totalPerPage={data?.length}
                    />
                } */}
            </div>
        </>
    )
}

export default SummaryDetails;
