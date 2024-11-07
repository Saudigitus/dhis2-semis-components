import React from "react";
import { Card } from "@dhis2/ui";
import classNames from "classnames";
import style from "./mobileRow.module.css";
import RowTable from "../row/RowTable";

export default function MobileRow(props: any): React.ReactElement {
  const { header, actions, title, value } = props;

  return (
    <Card
      className={classNames(style.cardContainer)}
    >
      <div>
        <div className={style.cardActions}>
          <span className={style.cardMessage}>
            {title}
          </span>
          {actions}
        </div>
        <div className={style.cardBody}>
          {
            header?.filter((x: any) => x.visible)?.map((column: any) => (
              <RowTable className={classNames(style.row)}>
                <td className={classNames(style.cell, style.headerCell)}>
                  {column.displayName}
                </td>
                <td className={classNames(style.cell, style.bodyCell)}>
                  {value}
                </td>
              </RowTable>
            ))
          }
        </div>
      </div>
    </Card>
  );
}
