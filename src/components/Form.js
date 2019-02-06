import React, { Component } from "react";
import styles from "../styles/Form.module.css";

export default class Form extends Component {
  render () {
    return <div className={styles.formWrapper}>
      <form className={styles.form} {...this.props} >
        {this.props.children}
      </form>
    </div>
  }
}