import React from "react";
import { SplitButton } from "@dhis2/ui";
import FlyoutMenu from "../../../components/menu/FlyoutMenu";
import { DropdownProps } from "../../../types/buttons/DropdownProps";
import styles from './DropdownButton.module.css'

function CustomDropdown(props: DropdownProps): React.ReactElement {
  const { name, icon, options, disabled, fullWidth } = props;

  return (
    <SplitButton
      icon={icon}
      disabled={disabled}
      className={fullWidth && styles.dropDown}
      component={<FlyoutMenu options={options} />}
    >
      {name}
    </SplitButton>
  );
}

export default CustomDropdown;