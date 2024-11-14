import React from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { RenderRowsProps } from '../../../types/table/TableContentProps';
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import MobileRow from '../components/mobileRow/MobileRow';
import RowTable from '../components/row/RowTable.tsx';
import RowCell from '../components/row/RowCell.tsx';
import TableRowActions from '../components/rowsActions/TableRowActions.tsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: { width: "100%" },
        historyRow: { backgroundColor: "#FFFF" },
        dataRow: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#F1FBFF'
            }
        },
        dataRowCollapsed: {
            backgroundColor: '#F1FBFF'
        },
        cell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) /
                2}px ${theme.spacing(1) * 3}px`,
            '&:last-child': {
                paddingRight: theme.spacing(1) * 3
            },
            borderBottomColor: "rgba(224, 224, 224, 1)",
            [theme.breakpoints.down('md')]: {
                padding: `{theme.spacing(1) * 1}px`,
                '&:last-child': {
                    paddingRight: `${theme.spacing(1) * 1}px`
                },
            },
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(1) * 1}px`,
                '&:last-child': {
                    paddingRight: `${theme.spacing(1) * 1}px`
                },
            },
        },
        bodyCell: {
            fontSize: theme.typography.pxToRem(13),
            color: theme.palette.text.primary,
            [theme.breakpoints.down('md')]: {
                fontSize: theme.typography.pxToRem(12),
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(11),
            }
        },
        actionsCell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) / 2}px ${theme.spacing(1 + 0.25)}px`,
            [theme.breakpoints.down('md')]: {
                padding: `${theme.spacing(1)}px`,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(1)}px`,
            }
        }
    })
);

function RenderRows(props: RenderRowsProps): React.ReactElement {
    const classes = useStyles()
    const { headerData, rowsData = [], searchActions, loading, viewPortWidth, isInactive, isOwnershipOu, showEnrollments, showRowActions, rowAction, displayType } = props;

    if (rowsData?.length === 0 && !loading) {
        return (
            <RowTable
                className={classes.row}
            >
                <RowCell
                    className={classNames(classes.cell, classes.bodyCell)}
                    colspan={headerData?.filter(x => x.visible)?.length as unknown as number + 1}
                >
                    {i18n.t('No data to display')}
                </RowCell>
            </RowTable>
        );
    }

    return (
        <React.Fragment>
            {
                rowsData?.map((row, index) => (
                    <>
                        {viewPortWidth > 520 ?
                            <RowTable
                                key={index}
                                inactive={isInactive}
                                isOwnershipOu={isOwnershipOu}
                                className={classNames(classes.row, classes.dataRow, (searchActions && showEnrollments) ? classes.dataRowCollapsed : null)}
                            >
                                {
                                    headerData?.filter(x => x.visible)?.map(column => (
                                        <RowCell
                                            key={column.id}
                                            className={classNames(classes.cell, classes.bodyCell)}
                                        >
                                            <div>
                                                {
                                                    row[column.id]
                                                }
                                            </div>
                                        </RowCell>
                                    ))
                                }
                                {
                                    showRowActions &&
                                    <RowCell
                                        key={"actions"}
                                        className={classNames(classes.cell, classes.bodyCell, classes.actionsCell)}
                                    >
                                        <TableRowActions
                                            actions={rowAction}
                                            disabled={isInactive}
                                            loading={loading!}
                                            displayType={displayType}
                                        />
                                    </RowCell>
                                }
                            </RowTable>
                            :
                            <MobileRow
                                row={row}
                                header={headerData}
                                inactive={isInactive}
                                isOwnershipOu={isOwnershipOu}
                                actions={
                                    <TableRowActions
                                        actions={rowAction}
                                        disabled={isInactive}
                                        loading={loading!}
                                        displayType={displayType}
                                    />
                                }
                            />
                        }
                    </>
                ))
            }
        </React.Fragment>
    )
}

export default RenderRows
