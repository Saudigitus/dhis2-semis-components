import React from 'react'
import ContentFilter from './ContentFilter';
import styles from './EnrollmentFilter.module.css'
import { EnrollmentFilterProps } from '../../../types/filters/filtersProps';

function EnrollmentFilters(props: EnrollmentFilterProps): React.ReactElement {
    
    return (
        <div className={styles.container}>
            <ContentFilter {...props}/>
        </div>
    )
}

export default EnrollmentFilters
