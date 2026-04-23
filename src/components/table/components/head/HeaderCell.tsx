import classNames from 'classnames';
import React from 'react'
import defaultClasses from '../table.module.css';
import { HeaderCellProps } from '../../../../types/table/TableContentProps';

function HeaderCell(props: HeaderCellProps): React.ReactElement {
    const { children, className, passOnProps, table, colspan, style, dataTest } = props;

    const classes = classNames(
        defaultClasses.tableCell,
        {
            [defaultClasses.tableCellBody]: table == null,
            [defaultClasses.tableCellHeader]: table?.head,
            [defaultClasses.tableCellFooter]: table?.footer
        },
        className
    );

    return (
        <td
            data-test={dataTest}
            className={classes}
            {...passOnProps}
            colSpan={colspan}
            style={style}
        >
            {children}
        </td>
    );
};

export default HeaderCell
