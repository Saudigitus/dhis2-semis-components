import React from 'react'
import classNames from 'classnames';
import { makeStyles, createStyles, type Theme } from '@material-ui/core/styles';
import { RenderHeaderProps } from '../../../types/table/TableContentProps';
import { Checkbox } from "@dhis2/ui"
import SortLabel from '../components/sortLabel/SortLabel';
import HeaderCell from '../components/head/HeaderCell';
import RowTable from '../components/row/RowTable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: { width: "100%" },
        cell: {
            borderBottomColor: "rgba(224, 224, 224, 1)",
            [theme.breakpoints.down('md')]: {
                padding: `${theme.spacing(1) * 1}px`,
                '&:last-child': {
                    paddingRight: `${theme.spacing(1) * 1}px`
                },
                fontSize: '13px !important',
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
            },
            borderBottomColor: "rgba(224, 224, 224, 1)"
        },
        headerCell: {
            fontSize: theme.typography.pxToRem(12),
            color: theme.palette.text.secondary,
            [theme.breakpoints.down('md')]: {
                fontSize: theme.typography.pxToRem(11),
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(10),
            },
            fontWeight: 500
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1
        }
    })
);

function RenderHeader(props: RenderHeaderProps): React.ReactElement {
    const { rowsHeader = [], order, orderBy, createSortHandler, isCheckbox, checked, indeterminate, onChange, sortable, showRowActions } = props
    const classes = useStyles()

    const headerCells = rowsHeader?.filter(x => x.visible)?.map((column) => (
        <HeaderCell
            key={column.id}
            className={classNames(classes.cell, classes.headerCell)}
        >
            {
                sortable ?
                    <SortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        createSortHandler={createSortHandler ? createSortHandler(column.id) : undefined}
                        className={classNames(classes.cell, classes.headerCell)}
                    >
                        {column.displayName}
                        {orderBy === column.id
                            ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            )
                            : null}
                    </SortLabel>
                    :
                    column.displayName
            }
        </HeaderCell>
    ))

    return (
        <thead>
            <RowTable
                className={classes.row}
            >
                {isCheckbox &&
                    <HeaderCell
                        className={classNames(classes.cell, classes.headerCell)}
                    >
                        <Checkbox
                            indeterminate={indeterminate}
                            checked={checked}
                            onChange={(event) => onChange && onChange(event as any)}
                        />
                    </HeaderCell>
                }

                {headerCells}

                {showRowActions &&
                    <HeaderCell
                        className={classNames(classes.cell, classes.headerCell)}
                    >
                        <span>Actions</span>
                    </HeaderCell>
                }
            </RowTable>
        </thead>
    )
}

export default RenderHeader
