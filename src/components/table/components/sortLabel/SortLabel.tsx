import React from 'react'
import { TableSortProps } from '../../../../types/table/TableContentProps';
import { TableSortLabel } from '@mui/material';

function SortLabel(props: TableSortProps): React.ReactElement {
    return (
        <TableSortLabel
            active={props.active}
            direction={props.direction}
            onClick={(id: any) => { props.createSortHandler(id) }}
            className={props.className}
        >
            {props.children}
        </TableSortLabel>
    )
}

export default SortLabel
