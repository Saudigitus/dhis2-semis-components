import React, { ReactElement } from "react";
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
  selected?: number
  selectable?: boolean
  beforeSettings?: ReactElement
}

function HeaderFilters(props: HeaderFiltersProps): React.ReactElement {
  const { beforeSettings, updateVariables, filteredHeaders, columns, filterState, setFilterState, defaultFilterNumber, selectable, selected } = props;

  return (
    <div className={styles.filterContainer}>
      <EnrollmentFilters filterState={filterState} variables={columns} setFilterState={setFilterState} defaultFilterNumber={defaultFilterNumber} />

      <div>
        {beforeSettings}
        <ConfigTableColumns selected={selected} selectable={selectable} filteredHeaders={filteredHeaders} headers={columns} updateVariables={updateVariables} />
      </div>
    </div>
  );
}

export default HeaderFilters;
