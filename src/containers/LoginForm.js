import { Component } from "react";
import InputGroup from "../components/InputGroup";
import Label from "../components/Label";
import Input from "../components/Input";
import React, { Fragment } from "react";
import Button from "../components/Button";
import airtableProxyApi from "../clients/airtableProxyApi";
import styles from "../styles/Form.module.css";
import LaddaButton from "react-ladda";

export default class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      success: false,
      error: null,
      loading: false
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      await airtableProxyApi.sendEmailLink(this.state.email);
      this.setState({ success: true, loading: false });
    } catch (err) {
      this.setState({ error: err, loading: false, success: false });
    }
  }

  handleInputChange = (event) => {
    this.setState({ email: event.target.value });
  }

  renderSuccess () {
    return <div>
      Great! Check your email at <b>{this.state.email}</b> for a link to continue.
      <br />
      <br />
    </div>
  }

  renderFormBody () {
    return <Fragment>
      <div>To provide community group information, please enter your email address below, and we'll email you a link to get started.</div>
      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="text" id="email" value={this.state.email} onChange={this.handleInputChange}></Input>
      </InputGroup>
    </Fragment>
  }

  render () {
    return <div className={styles.formWrapper}>
      <form onSubmit={this.handleSubmit}>
        {
          this.state.success ? this.renderSuccess() : this.renderFormBody()
        }
        <LaddaButton loading={this.state.loading} {...(this.state.success ? { disabled: true } : {})}>Submit</LaddaButton>
      </form>
    </div>
  }
}