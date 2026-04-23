import React from 'react';
import style from '../tableRowActions.module.css'
import { RowActionsProps, RowActionsType } from '../../../../../types/table/TableRowActionsProps';
import { IconButton, Tooltip } from '@mui/material';

export default function IconActions(props: RowActionsProps) {
  const { actions, disabled, row, dataTest } = props;

  return (
    <React.Fragment>
      {
        actions?.map((option: RowActionsType, i: number) => (
          <Tooltip
            key={i}
            title={option.label}
            data-test={`${dataTest}-action-tooltip`}
            disableHoverListener={(option.disabled || (disabled && Boolean(option.disableOnInactive)))}
          >
            <div
              data-test={`${dataTest}-actions-container`}
              style={{ cursor: (option.disabled || (disabled && Boolean(option.disableOnInactive))) ? 'not-allowed' : "pointer" }}
            >
              <IconButton
                onClick={(event) => {
                  option.onClick({ row });
                }}
                className={style.rowActionsIcon}
                data-test={`${dataTest}-action-button`}
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
