import React from "react"
import { SimpleButtonsComponentProps } from "../../../types/buttons/switchButtonsProps";
import SimpleDropdownButton from "./components/SimpleDropdownButton";
import SimpleButtons from "./components/SimpleButtons";



export default function SwitchButtonView({ items, maxLinearItems, selected, setSelected, onSelect, buttonClassName }: SimpleButtonsComponentProps): React.ReactElement {
  const maxItems = maxLinearItems ?? 3;

  return (
    <div>
      {items?.length > maxItems ? (
        <SimpleDropdownButton
          items={items}
          selected={selected}
          setSelected={setSelected}
          onSelect={onSelect}
        />
      ) : (
        <SimpleButtons
          items={items}
          selected={selected}
          setSelected={setSelected}
          onSelect={onSelect}
          buttonClassName={buttonClassName}
        />
      )}
    </div>
  )
}


