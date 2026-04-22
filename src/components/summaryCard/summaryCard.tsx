import React from "react";
import styles from "./summaryCard.module.css";
import { CardSummaryProps } from "../../types/cards/cardSummaryProps";
import classNames from "classnames";

export default function SummaryCard(props: CardSummaryProps): React.ReactElement {
  const { value, label, color, className, dataTest } = props;

  return (
    <div data-test={dataTest}  className={classNames(styles.summaryCard, styles[color], className)}>
      <div>
        <h5>{value}</h5>
        <span>{label}</span>
      </div>
    </div>
  );
}
