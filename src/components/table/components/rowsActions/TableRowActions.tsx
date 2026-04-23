import React from 'react';
import style from './tableRowActions.module.css'
import IconActions from './components/IconActions';
import MenuActions from './components/MenuActions';
import { CircularLoader, Center as CenteredContent } from '@dhis2/ui'
import { TableRowActionsProps } from '../../../../types/table/TableRowActionsProps';


export default function TableRowActions(props: TableRowActionsProps) {
  const { displayType = "icon", actions, loading, disabled, row, dataTest } = props;

  const renderMenu = (type: "icon" | "menu") => {
    switch (type) {
      case "menu":
        return <MenuActions dataTest={dataTest} disabled={disabled} actions={actions} row={row} />

      case "icon":
      default:
        return <IconActions dataTest={dataTest} disabled={disabled} actions={actions} row={row} />
    }
  }

  if (loading) {
    return (
      <CenteredContent>
        <CircularLoader small />
      </CenteredContent>
    )
  }

  return (
    <div className={style.rowActionsContainer}>{renderMenu(displayType)}</div>
  )
}