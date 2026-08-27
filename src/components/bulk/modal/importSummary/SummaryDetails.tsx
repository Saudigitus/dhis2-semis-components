import React, { useEffect, useState } from "react";
import { TabBar, Tab } from '@dhis2/ui'
import { SummaryTable } from "./SummaryContent";
import Pagination from "../../../../components/table/components/pagination/Pagination";
import { TranslationState } from "../../../../schemas/translationsSchema";
import { useRecoilValue } from "recoil";

const getStats = (validRecords: any[], invalidRecords: any[], invalid = false) => {
    if (invalid) {
        let soma = validRecords?.reduce((acc: number, item: any) => {
            return acc + Object.values(item?.Attendance)?.filter((v: string) => v?.length == 0)?.length;
        }, 0)

        soma += invalidRecords?.reduce((acc: number, item: any) => {
            return acc + Object.values(item?.Attendance)?.filter((v: string) => v?.length == 0)?.length;
        }, 0)

        return soma;
    } else {

        const soma = validRecords?.reduce((acc: number, item: any) => {
            return acc + Object.values(item?.Attendance)?.filter((v: string) => v?.length > 0 && v != "Non School Day")?.length;
        }, 0)

        return soma
    }
}

const SummaryDetails = ({ module, invalidRecords, doneProcessing, validRecords, programConfig, stats = {} }: { module: string, stats: any, programConfig: any, validRecords: any, invalidRecords: any, doneProcessing: boolean }): React.ReactElement => {
    const [data, setData] = useState<any>([])
    const [activeTab, setActiveTab] = useState("valid")
    const [pagination, setPagination] = useState<any>({ valid: { page: 1, pageSize: 10 }, invalid: { page: 1, pageSize: 10 } });
    const currentPage = pagination[activeTab]?.page;
    const tabPageSize = pagination[activeTab]?.pageSize;

    // Safely default undefined lists to arrays to avoid spread/slice errors
    const errorDetails = Array.isArray(stats?.errorDetails) ? stats.errorDetails : []
    const exceptions = Array.isArray(stats?.exceptions) ? stats.exceptions : []
    const safeValidRecords = Array.isArray(validRecords) ? validRecords : []
    const safeInvalidRecords = Array.isArray(invalidRecords) ? invalidRecords : []

    const dataCont = {
        valid: doneProcessing ? [...errorDetails, ...exceptions] : safeValidRecords,
        invalid: safeInvalidRecords
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
                    {module == 'attendance' ? getStats(validRecords, invalidRecords) : safeValidRecords.length}<br /> {`${i18n.t('New Records')}`}
                </Tab>
                <Tab onClick={() => { setActiveTab('invalid') }} selected={activeTab === 'invalid'}>
                    {module == 'attendance' ? getStats(validRecords, invalidRecords, true) : safeInvalidRecords.length}<br /> {`${i18n.t('Invalid Records')}`}
                </Tab>
            </TabBar>}

            <br />

            <div style={{ height: doneProcessing ? "200px" : "137px", overflow: "auto" }}>

                <SummaryTable
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
