import React from 'react'
import Select from 'react-select';
import defaultClasses from '../table.module.css';
import { PaginationProps } from '../../../../types/table/PaginationProps';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import TextPagination from '../pagination/TextPagination';
import IconButtonPagination from '../pagination/IconButtonPagination';
import { useRecoilValue } from 'recoil';
import { TranslationState } from '../../../../schemas/translationsSchema';


function TopPaginator({ dataTest, page, rowsPerPage, onPageChange, totalData, disablePreviousPage, disableNextPage, totalElements }: PaginationProps): React.ReactElement {
    const start = (page - 1) * rowsPerPage + 1;
    const end = start + totalData - 1;
    const i18n = useRecoilValue(TranslationState) as any

    return (
        <div data-test={dataTest} className={defaultClasses.pagination}>
            <div />

            <div className={defaultClasses.rootPagination}>
                {TextPagination(`${start} - ${end}`)}

                <div className={defaultClasses.separator} />

                <IconButtonPagination
                    dataTest={`${dataTest}-previous-page`}
                    Icon={<KeyboardArrowLeft />}
                    ariaLabel={i18n.t('Previous Page')}
                    disabled={disablePreviousPage}
                    onPageChange={() => { onPageChange(page - 1); }}
                />

                <IconButtonPagination
                    dataTest={`${dataTest}-next-page`}
                    Icon={<KeyboardArrowRight />}
                    ariaLabel={i18n.t('Next Page')}
                    disabled={disableNextPage}
                    onPageChange={() => { onPageChange(page + 1); }}
                />

            </div>
        </div>
    )
}

export default TopPaginator
