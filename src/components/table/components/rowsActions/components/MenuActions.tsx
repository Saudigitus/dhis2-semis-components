import React from 'react';
import { Center as CenteredContent } from '@dhis2/ui'
import { RowActionsProps } from '../../../../../types/table/TableRowActionsProps';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';


export default function MenuActions(props: RowActionsProps) {
  const { actions: menuItems, disabled, row, dataTest } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CenteredContent>
        <IconButton
          id="basic-button"
          aria-haspopup="true"
          disabled={disabled}
          onClick={handleClick}
          data-test={`${dataTest}-button`}
          aria-expanded={open ? 'true' : undefined}
          aria-controls={open ? 'basic-menu' : undefined}
          style={{ color: "#212121", opacity: disabled ? "0.5" : "1" }}
        >
          <MoreVert />
        </IconButton>
      </CenteredContent>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        data-test={`${dataTest}-action-menu`}
      >
        {menuItems?.map((item: any, index: any) => (
          <MenuItem dense
            key={index}
            data-test={`${dataTest}-action-menu-item`}
            onClick={(event) => {
              item.onClick({ row });
              handleClose();
            }}
            disabled={item.disabled || (disabled && Boolean(item.disableOnInactive))}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
