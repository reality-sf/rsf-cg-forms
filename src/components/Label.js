import React from "react";
import styles from "../styles/Label.module.css";

const Label = (props) => {
  return <label className={styles.label} {...props}></label>;
}

export default Label;
