import React, { useEffect, useRef, useState } from "react";
import styles from "../button.module.css";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import classNames from "classnames";
import { SimpleButtonsComponentProps, SimpleButtonType } from "../../../../types/buttons/switchButtonsProps";

export default function SimpleDropdownButton(props: SimpleButtonsComponentProps): React.ReactElement {
  const { items, selected, setSelected, onSelect } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (buttonRef.current) {
      setMenuWidth(buttonRef.current.offsetWidth);
    }
  }, [selected]);

  const handleSelect = (item: SimpleButtonType) => {
    setSelected(item); 
    setAnchorEl(null);
    onSelect()
  }

  return (
    <>
      <Button
        ref={buttonRef}
        className={styles.simpleDropdownButton}
        variant="outlined"
        onClick={handleClick}
        endIcon={anchorEl === null ? <ExpandMore className={styles.dropdownIcon} /> : <ExpandLess className={styles.dropdownIcon} />}
      >
        {selected?.label ?? "Select an item"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          style: { boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", width: menuWidth }
        }}
      >
        {items.map((item, i) => (
          <MenuItem
            key={i}
            className={classNames(styles.simpleMenuItem, selected?.id === item.id && styles.activeMenuItem)}
            onClick={() => handleSelect(item)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
