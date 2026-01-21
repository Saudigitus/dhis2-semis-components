import React, { useEffect, useState } from "react";
import { TabBar, Tab } from '@dhis2/ui'
import { SummaryTable } from "./SummaryContent";
import Pagination from "../../../../components/table/components/pagination/Pagination";
import { TranslationState } from "../../../../schemas/translationsSchema";
import { useRecoilValue } from "recoil";

const SummaryDetails = ({ invalidRecords, doneProcessing, validRecords, programConfig, stats = {} }: { stats: any, programConfig: any, validRecords: any, invalidRecords: any, doneProcessing: boolean }): React.ReactElement => {
    const [data, setData] = useState<any>([])
    const [activeTab, setActiveTab] = useState("valid")
    const [pagination, setPagination] = useState<any>({ valid: { page: 1, pageSize: 10 }, invalid: { page: 1, pageSize: 10 } });
    const currentPage = pagination[activeTab]?.page;
    const tabPageSize = pagination[activeTab]?.pageSize;
    console.log(stats, doneProcessing)

    const errorDetails = Array.isArray(stats?.errorDetails) ? stats.errorDetails : []
    const exceptions = Array.isArray(stats?.exceptions) ? stats.exceptions : []
    const safeValidRecords = Array.isArray(validRecords) ? validRecords : []
    const safeInvalidRecords = Array.isArray(invalidRecords) ? invalidRecords : []

    const dataCont = {
        valid: safeValidRecords,
        invalid: doneProcessing ? [...errorDetails, ...exceptions, ...safeInvalidRecords] : safeInvalidRecords
    }
    const i18n = useRecoilValue(TranslationState) as any

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
                    {safeValidRecords.length}<br /> {`${i18n.t('New Records')}`}
                </Tab>
                <Tab onClick={() => { setActiveTab('invalid') }} selected={activeTab === 'invalid'}>
                    {safeInvalidRecords.length}<br /> {`${i18n.t('Invalid Records')}`}
                </Tab>
            </TabBar>}

            {doneProcessing && <TabBar>
                <Tab onClick={() => { setActiveTab('valid') }} selected={activeTab === 'valid'}>
                    {safeValidRecords.length}<br /> {`${i18n.t('Imported Records')}`}
                </Tab>
                {(errorDetails.length + exceptions.length + safeInvalidRecords.length) > 0 && <Tab onClick={() => { setActiveTab('invalid') }} selected={activeTab === 'invalid'}>
                    {errorDetails.length + exceptions.length + safeInvalidRecords.length}<br /> {`${i18n.t('Errors')}`}
                </Tab>}
            </TabBar>}

            <br />

            <div style={{ height: doneProcessing ? "200px" : "137px", overflow: "auto" }}>

                <SummaryTable
                    displayData={data}
                    doneProcessing={doneProcessing}
                    programConfig={programConfig}
                />

                <br />
                {(dataCont?.[activeTab]?.length > 0) &&
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
