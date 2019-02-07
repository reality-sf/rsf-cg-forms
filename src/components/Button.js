import React from "react";
import styles from "../styles/Button.module.css";

const Button = (props) => {
  return <div className={styles.buttonWrapper}>
    <button className={styles.button} {...props}></button>
  </div>
};

export default Button;
