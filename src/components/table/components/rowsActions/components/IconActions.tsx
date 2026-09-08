import React from 'react';
import style from '../tableRowActions.module.css'
import { RowActionsProps, RowActionsType } from '../../../../../types/table/TableRowActionsProps';
import { IconButton, Tooltip } from '@mui/material';

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
                data-test={option.ariaLabel}
                aria-label={option.ariaLabel}
                className={style.rowActionsIcon}
                disabled={option.disabled || (disabled && Boolean(option.disableOnInactive))}
                style={{ color: option.color, opacity: (option.disabled || (disabled && Boolean(option.disableOnInactive))) ? "0.5" : "1" }}
              >
                {option.icon}
              </IconButton>
            </div>

            {/* {
              actions?.map((option: RowActionsType, i: number) => (
                <Tooltip
                  key={i}
                  title={option.label}
                  aria-label={option.ariaLabel}
                  disableHoverListener={(option.disabled || (disabled && Boolean(option.disableOnInactive)))}
                >
                  {
                    option?.button ? (
                      <button
                        onClick={(event) => {
                          option.onClick({ row });
                        }}
                        className={style.rowActionsButton}
                        disabled={option.disabled || (disabled && Boolean(option.disableOnInactive))}
                        style={{ color: option.color, opacity: (option.disabled || (disabled && Boolean(option.disableOnInactive))) ? "0.5" : "1" }}
                      >
                        {option.icon}
                        <span>{option.label}</span>
                      </button>
                    ) :

                      (
                        <button
                          onClick={(event) => {
                            option.onClick({ row });
                          }}
                          className={style.rowActionsButton}
                          disabled={option.disabled || (disabled && Boolean(option.disableOnInactive))}
                          style={{ color: option.color, opacity: (option.disabled || (disabled && Boolean(option.disableOnInactive))) ? "0.5" : "1" }}
                        >
                          {option.icon}
                        </button>
                      )

                  }
                </Tooltip>
              ))
            } */}
          </Tooltip>
        ))
      }
    </React.Fragment>
  );
}
