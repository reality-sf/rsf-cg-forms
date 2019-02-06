import React from "react";
import logo from "../images/logo.png";
import styles from "../styles/Masthead.module.css";

const Masthead = (props) => {
  return <h1 className={styles.masthead}>
    <div>
      <img src={logo} alt="Reality SF" width="150px" />
      <br />
      <br />
      <span>{props.title}</span>
    </div>
  </h1>
}

export default Masthead;
