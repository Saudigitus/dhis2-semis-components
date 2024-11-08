import React from "react";
import styles from './HeaderFilters.module.css'

interface HeaderFiltersProps {
  EnrollmentFilters: React.ElementType
  ConfigTableColumns: React.ElementType
}

function HeaderFilters(props: HeaderFiltersProps): React.ReactElement {
  const { ConfigTableColumns, EnrollmentFilters } = props

  return (
    <div className={styles.filterContainer}>
      <EnrollmentFilters />

      <ConfigTableColumns />
    </div>
  );
}

export default HeaderFilters;
