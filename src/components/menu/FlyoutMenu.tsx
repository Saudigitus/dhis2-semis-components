import React from "react";
import { Divider } from "@material-ui/core"
import { MenuItem, FlyoutMenu as Menu } from "@dhis2/ui";
import { FlyoutMenuProps } from "../../types/menu/FlyoutMenuProps";

function FlyoutMenu(props: FlyoutMenuProps): React.ReactElement {
  const { options } = props;
  return (
    <Menu>
      {options.map((option: any, i: any) => (
        <>
          <MenuItem
            key={i}
            {...option}
            disabled={option.disabled ?? false}
          />
          {(option.divider !== false && i !== options.length - 1) && <Divider />}
        </>
      ))}
    </Menu>
  );
}

export default FlyoutMenu;
