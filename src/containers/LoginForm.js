import { Component } from "react";
import InputGroup from "../components/InputGroup";
import Label from "../components/Label";
import Input from "../components/Input";
import React from "react";
import airtableProxyApi from "../clients/airtableProxyApi";
import LaddaButton from "react-ladda";
import ErrorMessage from "../components/ErrorMessage";

export default class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      success: false,
      error: null,
      loading: false,
      errorEmail: ''
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      await airtableProxyApi.sendEmailLink(this.state.email);
      this.setState({ success: true, loading: false });
    } catch (err) {
      this.setState({ error: err, loading: false, success: false, errorEmail: this.state.email });
    }
  }

  handleInputChange = (event) => {
    this.setState({ email: event.target.value });
  }

  renderErrorMessage () {
    if (!this.state.error) {
      return null;
    }
    if (this.state.error.response && this.state.error.response.status === 404) {
      return <ErrorMessage>We were unable to find the email <b>{this.state.errorEmail}</b> in our system. Is it correct? If so, please email Nkechi at <b><a href="mailto:nkechi@realitysf.com">nkechi@realitysf.com</a></b> so we can get you into the system.</ErrorMessage>
    }
    return <ErrorMessage>An unknown error has occured.</ErrorMessage>
  }

  renderSuccess () {
    return <>
      Great! Check your email at <b>{this.state.email}</b> for a link to continue.
      <br />
      <br />
    </>
  }

  renderFormBody () {
    return <>
      { this.renderErrorMessage() }
      <div>To provide community group information, please enter your email address below, and we'll email you a link to get started.</div>
      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={this.state.email} onChange={this.handleInputChange} required />
      </InputGroup>
    </>
  }

  render () {
    return <form onSubmit={this.handleSubmit}>
      {
        this.state.success ? this.renderSuccess() : this.renderFormBody()
      }
      <LaddaButton loading={this.state.loading} {...(this.state.success ? { disabled: true } : {})}>Submit</LaddaButton>
    </form>
  }
}