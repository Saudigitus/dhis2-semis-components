import React from "react";
import { SplitButton } from "@dhis2/ui";
import FlyoutMenu from "../../../components/menu/FlyoutMenu";
import { DropdownProps } from "../../../types/buttons/DropdownProps";

function CustomDropdown(props: DropdownProps): React.ReactElement {
  const { name, icon, options, disabled } = props;

  return (
    <SplitButton
      icon={icon}
      disabled={disabled}
      component={<FlyoutMenu options={options} />}
    >
      {name}
    </SplitButton>
  );
}

export default CustomDropdown;