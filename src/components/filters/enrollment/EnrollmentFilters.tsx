import React from 'react'
import ContentFilter from './ContentFilter';
import styles from './EnrollmentFilter.module.css'

function EnrollmentFilters({ headers }: any): React.ReactElement {

    return (
        <div className={styles.container}>
            <ContentFilter headers={headers} />
        </div>
    )
}

export default EnrollmentFilters
