import React from "react";
import classNames from "classnames";
import styles from "./text.module.css";
import { TextProps } from "../../types/text/TextProps";

function Text(props: TextProps): React.ReactElement {
  const { label, type, weight = "bold", style, dataTest } = props;

  return <label style={style} className={classNames(styles.text, styles[`${type}`], styles[`${weight}`])} data-test={dataTest}>{label}</label>;
}

export default Text;