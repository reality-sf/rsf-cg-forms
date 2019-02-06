import React from "react";
import styles from "../styles/Button.module.css";

const Button = (props) => {
  return <div className={styles.buttonWrapper}>
    <input type="submit" name="submit" className={styles.button}></input>
  </div>
};

export default Button;
