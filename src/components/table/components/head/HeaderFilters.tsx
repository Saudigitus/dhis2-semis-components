import React from "react";
import styles from './HeaderFilters.module.css'
import { type CustomAttributeProps } from 'dhis2-semis-types'
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";
import EnrollmentFilters from "../../../filters/enrollment/EnrollmentFilters";

interface HeaderFiltersProps {
  filteredHeaders: CustomAttributeProps[]
  updateVariables: (args: CustomAttributeProps[]) => void
  columns: CustomAttributeProps[]
  defaultFilterNumber?: number
  filterState: {
    dataElements: any[],
    attributes: any[]
  },
  setFilterState: (args: {
    dataElements: any[],
    attributes: any[]
  }) => void
}

function HeaderFilters(props: HeaderFiltersProps): React.ReactElement {
  const { updateVariables, filteredHeaders, columns, filterState, setFilterState, defaultFilterNumber } = props;

  return (
    <div className={styles.filterContainer}>
      <EnrollmentFilters filterState={filterState}  variables={columns} setFilterState={setFilterState} defaultFilterNumber={defaultFilterNumber} />

      <ConfigTableColumns filteredHeaders={filteredHeaders} headers={columns} updateVariables={updateVariables} />
    </div>
  );
}

export default HeaderFilters;
