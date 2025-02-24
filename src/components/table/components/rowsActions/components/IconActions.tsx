import React from 'react';
import style from '../tableRowActions.module.css'
import { IconButton, Tooltip } from '@material-ui/core';
import { RowActionsProps, RowActionsType } from '../../../../../types/table/TableRowActionsProps';

export default function IconActions(props: RowActionsProps) {
  const { actions, disabled, row } = props;

  return (
    <React.Fragment>
      {
        actions?.map((option: RowActionsType, i: number) => (
          <Tooltip
            key={i}
            title={option.label}
            disableHoverListener={(option.disabled || (disabled && Boolean(option.disableOnInactive)))}
          >
            <div
              style={{ cursor: (option.disabled || (disabled && Boolean(option.disableOnInactive))) ? 'not-allowed' : "pointer" }}
            >
              <IconButton
                onClick={(event) => {
                  option.onClick({ row });
                }}
                className={style.rowActionsIcon}
                disabled={option.disabled || (disabled && Boolean(option.disableOnInactive))}
                style={{ color: option.color, opacity: (option.disabled || (disabled && Boolean(option.disableOnInactive))) ? "0.5" : "1" }}
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
