import React from "react";
import styles from "./card.module.css";
import { CardProps } from "../../types/cards/SummaryCardProps";

export default function SummaryCard(props: CardProps): React.ReactElement {
  const { value, label, color, dataTest } = props;

  return (
    <div className={styles[color]} data-test={dataTest}>
      <div>
        <h5>{value}</h5>
        <span>{label}</span>
      </div>
    </div>
  );
}
