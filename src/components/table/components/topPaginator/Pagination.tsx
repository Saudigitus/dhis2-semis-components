import React from 'react'
import Select from 'react-select';
import defaultClasses from '../table.module.css';
import { PaginationProps } from '../../../../types/table/PaginationProps';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import TextPagination from '../pagination/TextPagination';
import IconButtonPagination from '../pagination/IconButtonPagination';


function TopPaginator({ page, rowsPerPage, onPageChange, totalData, disablePreviousPage, disableNextPage, totalElements }: PaginationProps): React.ReactElement {
    const start = (page - 1) * rowsPerPage + 1;
    const end = start + totalData - 1;

    return (
        <div className={defaultClasses.pagination}>
            <div />

            <div className={defaultClasses.rootPagination}>
                {TextPagination(`${start} - ${end} of ${totalElements}`)}

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

export default TopPaginator
