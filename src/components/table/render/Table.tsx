import React, { useState } from 'react'
import { Center as CenteredContent, CircularLoader } from "@dhis2/ui";
import RenderHeader from './RenderHeader'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import WithBorder from '../../template/WithBorder';
import WithPadding from '../../template/WithPadding';
import TableComponent from '../components/table/TableComponent';
import Pagination from '../components/pagination/Pagination';
import RenderRows from './RenderRows';
import { TableRenderProps } from '../../../types/table/TableContentProps';
import HeaderFilters from '../components/head/HeaderFilters';
import { type CustomAttributeProps } from 'dhis2-semis-types'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";
import { deepEqual } from '../../../utils/table/objectComparison';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        overflowX: 'auto'
    },
    workingListsContainer: {
        display: 'flex',
        padding: '0.6rem 0.5rem',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: '22px',
        fontWeigth: '500',
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        }
    }
}));

function Table(props: TableRenderProps): React.ReactElement {
    const {
        title = 'Table',
        viewPortWidth = 1040,
        columns,
        totalElements,
        loading = false,
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
        handlePageChange,
        handlePageSizeChange,
        page,
        pageSize,
        showHeaderFilters = true,
        showWorkingListsContainer = true,
        paginate = true
    } = props

    const classes = useStyles()
    const [filteredHeaders, setFilteredHeaders] = useState<CustomAttributeProps[]>([])

    const onPageChange = (newPage: number) => {
        handlePageChange(newPage)
    }

    const onRowsPerPageChange = (event: any) => {
        handlePageSizeChange(parseInt(event.value, 10))
    }

    const onCheckboxChange = (row: any, all?: boolean) => {
        if (all) {
            if (all && tableData.length === selected.length) setSelected([])
            else setSelected([...tableData])
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

    return (
        <Paper>
            {showWorkingListsContainer && <div className={classes.workingListsContainer}>
                <h4 className={classes.h4}>{title}</h4>
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
                    />}
                    <div
                        className={classes.tableContainer}
                    >
                        <TableComponent>
                            <>
                                {
                                    viewPortWidth > 520 &&
                                    <RenderHeader
                                        createSortHandler={createSortHandler}
                                        order={order}
                                        orderBy={orderBy}
                                        rowsHeader={filteredHeaders.length > 0 ? filteredHeaders : columns}
                                        sortable={sortable}
                                        showRowActions={showRowActions}
                                        onChange={onCheckboxChange}
                                        isCheckbox={selectable}
                                        selectedAll={tableData?.length === selected?.length}
                                    />
                                }
                                {!loading && (
                                    <RenderRows
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
                        page={page}
                        rowsPerPage={pageSize}
                        totalPerPage={totalElements}
                        disablePreviousPage={page === 1}
                        disableNextPage={page * pageSize >= totalElements}
                        rowsPerPages={rowsPerPages}
                    />}
                </WithBorder>
            </WithPadding>
        </Paper>
    )
}

export default Table
