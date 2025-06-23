import React from 'react'
import Select from 'react-select';
import defaultClasses from '../table.module.css';
import {  PaginationProps } from '../../../../types/table/PaginationProps';
import TextPagination from './TextPagination';
import IconButtonPagination from './IconButtonPagination';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';


function Pagination({ page, rowsPerPage, onPageChange, onRowsPerPageChange, disablePreviousPage, disableNextPage, rowsPerPages }: PaginationProps): React.ReactElement {
    return (
        <div className={defaultClasses.pagination}>
            <div />

            <div className={defaultClasses.rootPagination}>
                {TextPagination("Rows per page")}

                <Select
                    className={defaultClasses.textPagination}
                    value={rowsPerPage}
                    clearValueText={false}
                    options={rowsPerPages ??  [{ value: 50, label: "50" }, { value: 80, label: "80" }, { value: 120, label: "120" }]}
                    clearable={false}
                    searchable={false}
                    onChange={onRowsPerPageChange}
                    menuContainerStyle={{ top: 'auto', bottom: '100%' }}
                />
                {TextPagination(`Page ${page}`)}

                <div className={defaultClasses.separator} />

                <IconButtonPagination
                    Icon={<KeyboardArrowLeft />}
                    ariaLabel='Previous Page'
                    disabled={disablePreviousPage}
                    onPageChange={() => { onPageChange(page - 1); }}
                />

                <IconButtonPagination
                    Icon={<KeyboardArrowRight />}
                    ariaLabel='Next Page'
                    disabled={disableNextPage}
                    onPageChange={() => { onPageChange(page + 1); }}
                />

            </div>
        </div>
    )
}

export default Pagination
