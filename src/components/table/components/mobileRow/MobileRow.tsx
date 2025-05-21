import React from "react";
import { Card } from "@dhis2/ui";
import classNames from "classnames";
import RowCell from "../row/RowCell";
import RowTable from "../row/RowTable";
import style from "./mobileRow.module.css";
import { CropOriginal } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { GetImageUrl } from "../../../../utils/table/getImageUrl";
import { MobileRowsProps } from "../../../../types/table/TableContentProps";
import { getDisplayName } from "../../../../utils/table/getDisplayNameByOption";
import { Attribute, VariablesTypes } from "dhis2-semis-types/dist/declarations";
import { formatKeyValueTypeHeader } from "../../../../utils/common/formatKeyValueType";

export default function MobileRow(props: MobileRowsProps): React.ReactElement {
  const { imageUrl } = GetImageUrl()
  const { helperText, rowData, headerData, programConfig, rowActions, rowIndex, checkBox, showAction, checkable, } = props;


  return (
    <Card
      className={classNames(style.cardContainer)}
    >
      <div>
        <div className={style.cardActions}>
          <span className={style.cardMessage}>
            {helperText ?? (showAction || checkable) ? "Actions" : ""}
          </span>
          {rowActions}
          {checkBox}
        </div>
        <div className={style.cardBody}>
          <RowTable className={classNames(style.row)}>
            <RowCell className={classNames(style.cell, style.headerCell)}>#</RowCell>
            <RowCell className={classNames(style.cell, style.bodyCell)}>{rowIndex}</RowCell>
          </RowTable>
          {
            headerData?.filter((x: any) => x.visible)?.map((column: any) => (
              <RowTable className={classNames(style.row)}>
                <RowCell className={classNames(style.cell, style.headerCell)}>
                  {column.displayName}
                </RowCell>
                <RowCell className={classNames(style.cell, style.bodyCell)}>
                  {
                    column.type === VariablesTypes.Custom ?
                      rowData[column.id] :
                      formatKeyValueTypeHeader(headerData)[column.id] === Attribute.valueType.IMAGE ?
                        <a href={imageUrl({ attribute: column.id, trackedEntity: rowData.trackedEntity })} target='_blank'>
                          {rowData[column.id] &&
                            <Tooltip title="Click to open in new tab" >
                              <IconButton> <CropOriginal /></IconButton>
                            </Tooltip>
                          }
                        </a>
                        :
                        <div>
                          {getDisplayName({ metaData: column.id, value: rowData[column.id], program: programConfig })}
                        </div>
                  }
                </RowCell>
              </RowTable>
            ))
          }
        </div>
      </div>
    </Card>
  );
}