import React from "react";
import { SplitButton } from "@dhis2/ui";
import FlyoutMenu from "../../../components/menu/FlyoutMenu";
import { DropdownProps } from "../../../types/buttons/DropdownProps";

function CustomDropdown(props: DropdownProps): React.ReactElement {
  const { name, icon, options, disabled, id } = props;

  return (
    <SplitButton
      icon={icon}
      disabled={disabled}
      key={id}
      component={<FlyoutMenu options={options} />}
    >
      {name}
    </SplitButton>
  );
}

export default CustomDropdown;