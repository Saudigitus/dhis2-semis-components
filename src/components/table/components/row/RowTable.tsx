import classNames from 'classnames';
import React from 'react'
import Tooltip from "@material-ui/core/Tooltip";
import defaultClasses from '../table.module.css';
import { RowProps } from '../../../../types/table/TableContentProps';

function RowTable(props: RowProps): React.ReactElement {
    const { children, className, table, inactive = false, disableHoverListener, title, tooltip, ...passOnProps } = props;

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
            <Tooltip arrow={true} disableHoverListener={disableHoverListener} disableFocusListener
                title={title!}>
                <tr
                    className={classes}
                    {...passOnProps}
                >
                    {children}
                </tr>
            </Tooltip>
            :
            <tr
                className={classes}
                {...passOnProps}
            >
                {children}
            </tr>
    )
}

export default RowTable
