import classNames from 'classnames';
import React from 'react'
import defaultClasses from '../table.module.css';
import { RowProps } from '../../../../types/table/TableContentProps';
import { Tooltip } from '@mui/material';

function RowTable(props: RowProps): React.ReactElement {
    const { children, className, table, inactive = false, disableHoverListener, title, tooltip, dataTest, ...passOnProps } = props;

    const classes = classNames(
        defaultClasses.tableRow,
        {
            [defaultClasses.tableRowBody]: table == null,
            [defaultClasses.tableRowHeader]: table?.head,
            [defaultClasses.tableRowFooter]: table?.footer
        },
        className,
        inactive && defaultClasses.disabledRow
    );

    return (
        tooltip ?
            <Tooltip data-test={`${dataTest}-row-table-tooltip`} arrow={true} disableHoverListener={disableHoverListener} disableFocusListener
                title={title!}>
                <tr
                    data-test={`${dataTest}-row-table`}
                    className={classes}
                    {...passOnProps}
                >
                    {children}
                </tr>
            </Tooltip>
            :
            <tr
                data-test={`${dataTest}-row-table`}
                className={classes}
                {...passOnProps}
            >
                {children}
            </tr>
    )
}

export default RowTable
