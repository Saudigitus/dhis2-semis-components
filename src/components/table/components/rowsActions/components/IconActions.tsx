import React from 'react';
import style from '../tableRowActions.module.css'
import { IconButton, Tooltip } from '@material-ui/core';
import { RowActionsProps, RowActionsType } from '../../../../../types/table/TableRowActionsProps';

export default function IconActions(props: RowActionsProps) {
  const { actions, disabled } = props;

  return (
    <React.Fragment>
      {
        actions?.map((option: RowActionsType, i: number) => (
          <Tooltip
            key={i}
            title={option.label}
            disableHoverListener={(option.disabled || disabled)}
          >
            <div
              style={{ cursor: (option.disabled || disabled) ? 'not-allowed' : "pointer" }}
            >
              <IconButton
                onClick={() => { option.onClick() }}
                className={style.rowActionsIcon}
                disabled={option.disabled || disabled}
                style={{ color: option.color, opacity: (option.disabled || disabled) ? "0.3" : "1" }}
              >
                {option.icon}
              </IconButton>
            </div>
          </Tooltip>
        ))
      }
    </React.Fragment>
  );
}
