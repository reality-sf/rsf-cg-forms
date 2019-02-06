import styles from "../styles/InputGroup.module.css";
import React from "react";

const InputGroup = (props) => {
  return <div className={styles.inputGroup}>
    {props.children}
  </div>
};

export default InputGroup;