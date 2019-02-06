import React from "react";
import styles from "../styles/Input.module.css";

const Input = (props) => {
  return <input {...props} className={styles.input}></input>
};

export default Input;
