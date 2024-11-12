import React from "react";
import classNames from "classnames";
import styles from "./text.module.css";
import { TextProps } from "../../types/text/TextProps";

function Text(props: TextProps): React.ReactElement {
  const { label, type, weight = "bold" } = props;

  return <label className={classNames(styles.text, styles[`${type}`], styles[`${weight}`])}>{label}</label>;
}

export default Text;