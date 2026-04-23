import React from 'react';
import defaultClasses from '../table.module.css';
import { IconButtonPaginationProps } from "../../../../types/table/PaginationProps";
import { IconButton } from '@mui/material';

export default function IconButtonPagination(props: IconButtonPaginationProps): React.ReactElement {
    const { dataTest, Icon, ariaLabel, disabled, onPageChange } = props;
    return (
        <IconButton
            data-test={dataTest}
            onClick={(page: any) => onPageChange(page)}
            disabled={disabled}
            aria-label={ariaLabel}
            className={defaultClasses.iconButton}
        >
            {Icon}
        </IconButton>
    )
}