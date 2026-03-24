import React from 'react'
import Select from 'react-select';
import defaultClasses from '../table.module.css';
import {  PaginationProps } from '../../../../types/table/PaginationProps';
import TextPagination from './TextPagination';
import IconButtonPagination from './IconButtonPagination';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { TranslationState } from '../../../../schemas/translationsSchema';


function Pagination({ page, rowsPerPage, onPageChange, onRowsPerPageChange, disablePreviousPage, disableNextPage, rowsPerPages }: PaginationProps): React.ReactElement {
        const i18n = useRecoilValue(TranslationState) as any
    return (
        <div className={defaultClasses.pagination}>
            <div />

            <div className={defaultClasses.rootPagination}>
                {TextPagination(i18n.t("Rows per page"))}

                <Select
                    className={defaultClasses.textPagination}
                    value={rowsPerPage}
                    clearValueText={false}
                    options={rowsPerPages ??  [{ value: 10, label: "10" }, { value: 50, label: "50" }, { value: 80, label: "80" }, { value: 120, label: "120" }]}
                    clearable={false}
                    searchable={false}
                    onChange={onRowsPerPageChange}
                    menuContainerStyle={{ top: 'auto', bottom: '100%' }}
                />
                {TextPagination(`${i18n.t("Page")} ${page}`)}

                <div className={defaultClasses.separator} />

                <IconButtonPagination
                    Icon={<KeyboardArrowLeft />}
                    ariaLabel={i18n.t('Previous Page')}
                    disabled={disablePreviousPage}
                    onPageChange={() => { onPageChange(page - 1); }}
                />

                <IconButtonPagination
                    Icon={<KeyboardArrowRight />}
                    ariaLabel={i18n.t('Next Page')}
                    disabled={disableNextPage}
                    onPageChange={() => { onPageChange(page + 1); }}
                />

            </div>
        </div>
    )
}

export default Pagination
