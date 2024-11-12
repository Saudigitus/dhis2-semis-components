import React from "react";
import styles from './HeaderFilters.module.css'
import { CustomAttributeProps } from "../../../../types/variables/AttributeColumns";
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";

interface HeaderFiltersProps {
  filteredHeaders: CustomAttributeProps[]
  updateVariables: (args: CustomAttributeProps[]) => void
  columns: CustomAttributeProps[]
}

function HeaderFilters(props: HeaderFiltersProps): React.ReactElement {
  const { updateVariables, filteredHeaders, columns } = props;

  return (
    <div className={styles.filterContainer}>
      <div />

      <ConfigTableColumns filteredHeaders={filteredHeaders} headers={columns} updateVariables={updateVariables} />
    </div>
  );
}

export default HeaderFilters;
