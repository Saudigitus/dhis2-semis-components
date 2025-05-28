import React, { useState } from 'react'
import { Center as CenteredContent, CircularLoader } from "@dhis2/ui";
import RenderHeader from './RenderHeader'
import WithBorder from '../../template/WithBorder';
import WithPadding from '../../template/WithPadding';
import TableComponent from '../components/table/TableComponent';
import Pagination from '../components/pagination/Pagination';
import "./style.css"
import RenderRows from './RenderRows';
import { TableRenderProps } from '../../../types/table/TableContentProps';
import HeaderFilters from '../components/head/HeaderFilters';
import { type CustomAttributeProps } from 'dhis2-semis-types'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";
import { deepEqual } from '../../../utils/table/objectComparison';
import { useUrlParams } from 'dhis2-semis-functions';
import { checkCanceled } from '../../../utils/table/checkCanceled';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';

const useStyles = makeStyles((theme: any) => ({
    tableContainer: {
        overflowX: 'auto'
    },
    workingListsContainer: {
        display: 'flex',
        padding: '0.6rem 0.5rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            alignItems: 'start',
            flexDirection: 'column'
        },
    },
    tablebuttons: {
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '5px',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    h4: {
        margin: '10px 0px 10px 0px',
        fontSize: 'larger',
        fontWeight: '500',
        [theme.breakpoints.down('md')]: {
            margin: '10px 8px',
        },
    },
    rowCounter: {
        fontSize: '0.75em',
        color: "gray"
    }
}));

function Table(props: TableRenderProps): React.ReactElement {
    const {
        title = 'Table',
        viewPortWidth = 1040,
        showRowIndex = true,
        columns,
        loading = false,
        enableRowCounter = true,
        enableInactiveRowSelection = false,
        createSortHandler,
        order,
        orderBy,
        rowsPerPages,
        tableData,
        selectedOU,
        sortable = false,
        searchActions = false,
        showRowActions = false,
        rowAction = [],
        displayType,
        filterState,
        setFilterState,
        defaultFilterNumber,
        rightElements,
        programConfig,
        inactiveRowMessage,
        onRowClick,
        selectable,
        selected,
        setSelected,
        setPagination,
        pagination,
        showHeaderFilters = true,
        showWorkingListsContainer = true,
        paginate = true,
        beforeSettings
    } = props

    const classes = useStyles()
    const [filteredHeaders, setFilteredHeaders] = useState<CustomAttributeProps[]>([])
    const { urlParameters } = useUrlParams()
    const { sectionType } = urlParameters()
    const onPageChange = (newPage: number) => setPagination({ ...pagination, page: newPage })
    const filtered = enableInactiveRowSelection ? tableData : tableData.filter(x => !checkCanceled(x.status))

    const onRowsPerPageChange = (event: any) => setPagination({ ...pagination, pageSize: parseInt(event.value, 10) })


    const onCheckboxChange = (row: any, all?: boolean) => {
        if (all) {
            if (all && filtered.length === selected.length) setSelected([])
            else {
                setSelected([...filtered])
            }
        } else {
            const index = selected.findIndex((x: any) => deepEqual(x, row))

            if (index > -1) {
                let copy = [...selected]
                copy.splice(index, 1)
                setSelected(copy)
            } else {
                setSelected((prev: any) => ([...prev, row]))
            }
        }
    }

    const capitalSectionType = () => {
        return sectionType?.charAt(0)?.toUpperCase() + sectionType?.slice(1) + 's'
    }

    return (
        <Paper>
            {showWorkingListsContainer && <div className={classes.workingListsContainer}>
                {
                    enableRowCounter ? <h4 className={classes.h4}>{title}  {!loading ? <span className={classes.rowCounter}>{` (${tableData.length} ${capitalSectionType()}/${pagination?.totalElements})`}</span> : <></>}</h4> :
                        <h4 className={classes.h4}>{title}</h4>
                }
                <div className={classes.tablebuttons}>
                    {rightElements}
                </div>
            </div>}
            <WithBorder type='bottom' />
            <WithPadding>
                <WithBorder type='all'>
                    {showHeaderFilters && <HeaderFilters
                        columns={columns}
                        updateVariables={setFilteredHeaders}
                        filteredHeaders={filteredHeaders}
                        filterState={filterState}
                        setFilterState={setFilterState}
                        defaultFilterNumber={defaultFilterNumber}
                        selectable={selectable}
                        selected={selected?.length ?? 0}
                        beforeSettings={beforeSettings}
                    />}
                    <div
                        className={classes.tableContainer}
                    >
                        <TableComponent>
                            <>
                                {
                                    viewPortWidth > 520 &&
                                    <RenderHeader
                                        showRowIndex={showRowIndex}
                                        createSortHandler={createSortHandler}
                                        order={order}
                                        indeterminate={selected?.length > 0 && selected.length != filtered?.length}
                                        orderBy={orderBy}
                                        rowsHeader={filteredHeaders.length > 0 ? filteredHeaders : columns}
                                        sortable={sortable}
                                        showRowActions={showRowActions}
                                        onChange={onCheckboxChange}
                                        isCheckbox={selectable}
                                        selectedAll={!loading && filtered?.length === selected?.length}
                                    />
                                }
                                {!loading && (
                                    <RenderRows
                                        pagination={pagination}
                                        showRowIndex={showRowIndex}
                                        headerData={filteredHeaders.length > 0 ? filteredHeaders : columns}
                                        rowsData={tableData}
                                        loading={loading}
                                        selectedOU={selectedOU}
                                        searchActions={searchActions}
                                        viewPortWidth={viewPortWidth}
                                        showRowActions={showRowActions}
                                        rowAction={rowAction}
                                        displayType={displayType}
                                        programConfig={programConfig}
                                        inactiveRowMessage={inactiveRowMessage}
                                        onRowClick={onRowClick}
                                        onChange={onCheckboxChange}
                                        selected={selected}
                                        isCheckbox={selectable}
                                        enableInactiveRowSelection={enableInactiveRowSelection}
                                    />
                                )}
                            </>
                        </TableComponent>
                        {(loading) ? (
                            <CenteredContent className="p-5">
                                <CircularLoader />
                            </CenteredContent>
                        ) : null}
                    </div>
                    {paginate && <Pagination
                        loading={loading}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                        page={pagination.page}
                        rowsPerPage={pagination.pageSize}
                        disablePreviousPage={pagination.page === 1}
                        disableNextPage={pagination.page === pagination.totalPages}
                        rowsPerPages={rowsPerPages}
                    />}
                </WithBorder>
            </WithPadding>
        </Paper>
    )
}

export default Table
