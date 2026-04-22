import React, { useEffect, useRef, useState } from "react";
import styles from "../button.module.css";
import classNames from "classnames";
import { SimpleButtonsComponentProps, SimpleButtonType } from "../../../../types/buttons/switchButtonsProps";
import { Button, Menu, MenuItem } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import { TranslationState } from "../../../../schemas/translationsSchema";

export default function SimpleDropdownButton(props: SimpleButtonsComponentProps): React.ReactElement {
  const { items, selected, setSelected, onSelect } = props;
  const i18n = useRecoilValue(TranslationState) as any

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
    onSelect(item)
  }

  return (
    <>
      <Button
        ref={buttonRef}
        data-test={`simple-dropdown-button-${selected?.id}`}
        className={styles.simpleDropdownButton}
        variant="outlined"
        onClick={handleClick}
        endIcon={anchorEl === null ? <ExpandMore className={styles.dropdownIcon} /> : <ExpandLess className={styles.dropdownIcon} />}
      >
        {selected?.label ?? i18n.t("Select an item")}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        data-test="simple-dropdown-menu"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: {
            style: { boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", width: menuWidth }
          }
        }}
      >
        {items.map((item, i) => (
          <MenuItem
            key={i}
            data-test={`simple-dropdown-menu-item-${item?.id}`}
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
