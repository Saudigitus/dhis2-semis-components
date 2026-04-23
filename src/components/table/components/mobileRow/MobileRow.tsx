import React from "react";
import { Box } from "@mui/material";
import classNames from "classnames";
import RowCell from "../row/RowCell";
import RowTable from "../row/RowTable";
import style from "./mobileRow.module.css";
import { GetImageUrl } from "../../../../utils/table/getImageUrl";
import { MobileRowsProps } from "../../../../types/table/TableContentProps";
import { getDisplayName } from "../../../../utils/table/getDisplayNameByOption";
import { Attribute, VariablesTypes } from "dhis2-semis-types";
import { formatKeyValueTypeHeader } from "../../../../utils/common/formatKeyValueType";
import { CropOriginal } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useRecoilValue } from "recoil";
import { TranslationState } from "../../../../schemas/translationsSchema";

export default function MobileRow(props: MobileRowsProps): React.ReactElement {
  const { imageUrl } = GetImageUrl()
  const { helperText, rowData, headerData, programConfig, rowActions, dataTest, apiVersion } = props;
  const { rowIndex, checkBox, showAction, checkable, inactive } = props;
  const i18n = useRecoilValue(TranslationState) as any


  return (
    <Box
      className={classNames(style.cardContainer, inactive && style.disabledRow)}
    >
      <div
        data-test={dataTest}
        style={{ width: "100%" }}
      >
        <div className={style.cardActions} data-test={`${dataTest}-actions`}>
          <span className={style.cardMessage}>
            {helperText ?? (showAction || checkable) ? i18n.t("Actions") : ""}
          </span>
          {rowActions}
          {checkBox}
        </div>
        <div className={classNames(style.cardBody)}>
          <RowTable
            className={classNames(style.row)}
            dataTest={`${dataTest}-table-row-${rowData?.id}`}
          >
            <RowCell
              dataTest={`${dataTest}-table-row-cell-${rowData?.id}`}
              className={classNames(style.cell, style.headerCell)}
            >
              #
            </RowCell>
            <RowCell
              dataTest={`${dataTest}-table-row-cell-${rowData?.id}`}
              className={classNames(style.cell, style.bodyCell)}
            >
              {rowIndex}
            </RowCell>
          </RowTable>
          {
            headerData?.filter((x: any) => x.visible)?.map((column: any) => (
              <RowTable
                className={classNames(style.row)}
                dataTest={`${dataTest}-table-row-${rowData?.id}`}
              >
                <RowCell
                  className={classNames(style.cell, style.headerCell)}
                  dataTest={`${dataTest}-table-row-cell-${rowData?.id}`}
                >
                  {column.displayName}
                </RowCell>
                <RowCell
                  className={classNames(style.cell, style.bodyCell)}
                  dataTest={`${dataTest}-table-row-cell-${rowData?.id}`}
                >
                  {
                    column.type === VariablesTypes.Custom ?
                      rowData[column.id] :
                      formatKeyValueTypeHeader(headerData)[column.id] === Attribute.valueType.IMAGE ?
                        <a
                          data-test={`${dataTest}-row-cell-${rowData?.id}-image-url`}
                          href={imageUrl({ attribute: column.id, trackedEntity: rowData.trackedEntity, apiVersion, program: programConfig.id })} target='_blank'>
                          {rowData[column.id] &&
                            <Tooltip title={i18n.t("Click to open in new tab")} >
                              <IconButton> <CropOriginal /></IconButton>
                            </Tooltip>
                          }
                        </a>
                        :
                        <div data-test={`${dataTest}-row-cell-${rowData?.id}-value`}>
                          {getDisplayName({ metaData: column.id, value: rowData[column.id], program: programConfig })}
                        </div>
                  }
                </RowCell>
              </RowTable>
            ))
          }
        </div>
      </div>
    </Box>
  );
}