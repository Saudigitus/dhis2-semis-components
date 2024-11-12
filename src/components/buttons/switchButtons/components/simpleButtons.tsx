import React from "react"
import styles from "../button.module.css"
import { ButtonStrip } from "@dhis2/ui"
import { SimpleButtonsComponentProps, SimpleButtonType } from "../../../../types/buttons/switchButtonsProps"
import classNames from "classnames"

export default function SimpleButtons(props: SimpleButtonsComponentProps): React.ReactElement {
  const { items, selected, setSelected, onSelect, buttonClassName } = props

  const handleSelect = (item: SimpleButtonType) => {
    if (selected?.id !== item?.id) {
      setSelected(item)
      onSelect()
    }
  }

  return (
    <ButtonStrip>
      {items?.map((item) => (
        <div
          key={item?.id}
          className={classNames(styles.simpleButton , selected?.id === item?.id ? styles["active-button"] : "", buttonClassName)}
          onClick={() => handleSelect(item)}
        >
          <span className={styles.simpleButtonLabel}>{item?.label}</span>
        </div>
      ))}
    </ButtonStrip>
  )
}
