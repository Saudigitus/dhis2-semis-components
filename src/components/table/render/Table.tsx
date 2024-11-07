import React, { useState } from 'react'
import { Center as CenteredContent, CircularLoader } from "@dhis2/ui";
import RenderHeader from './RenderHeader'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import WithBorder from '../../template/WithBorder';
import WithPadding from '../../template/WithPadding';
import HeaderFilters from '../components/head/HeaderFilters';
import TableComponent from '../components/table/TableComponent';
import Pagination from '../components/pagination/Pagination';

const usetStyles = makeStyles((theme) => ({
    tableContainer: {
        overflowX: 'auto'
    },
    workingListsContainer: {
        display: 'flex',
        marginLeft: '0.5rem',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    h4: {
        margin: '0px',
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

function Table(props: any): React.ReactElement {	
    const { viewPortWidth, columns, totalElements, loading, createSortHandler, order, orderBy, rowsPerPages } = props
    const classes = usetStyles()
    const [page, setpage] = useState(1)
    const [pageSize, setpageSize] = useState(10)

    const onPageChange = (newPage: number) => {
        setpage(newPage)
    }

    const onRowsPerPageChange = (event: any) => {
        setpageSize(parseInt(event.value, 10))
        setpage(1)
    }

    return (
        <Paper>
            {/* <div className={classes.workingListsContainer}>
                <h4 className={classes.h4}>Enrollments</h4>
                <WorkingLists />
            </div> */}
            <WithBorder type='bottom' />
            <WithPadding>
                <WithBorder type='all'>
                    <HeaderFilters 
                        EnrollmentFilters={props.EnrollmentFilters} 
                        ConfigTableColumns={props.ConfigTableColumns} 
                    />
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
                                        rowsHeader={columns}
                                        sortable={true}
                                    />
                                }

                            </>
                        </TableComponent>
                        {(loading) ? (
                            <CenteredContent className="p-5">
                                <CircularLoader />
                            </CenteredContent>
                        ) : null}
                    </div>
                    <Pagination
                        loading={loading}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                        page={page}
                        rowsPerPage={pageSize}
                        totalPerPage={totalElements}
                        disablePreviousPage={page === 1}
                        disableNextPage={page * pageSize >= totalElements}
                        rowsPerPages={rowsPerPages}
                    />
                </WithBorder>
            </WithPadding>
        </Paper>
    )
}

export default Table
