import { Component } from "react";
import InputGroup from "../shared/components/InputGroup";
import Label from "../shared/components/Label";
import Input from "../shared/components/Input";
import React from "react";
import session from "../shared/clients/session";
import LaddaButton, { S } from "react-ladda";
import ErrorMessage from "../shared/components/ErrorMessage";

export default class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: this.initialEmail(),
      success: false,
      error: null,
      loading: false,
      errorEmail: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      await session.sendEmailLink(this.state.email);
      this.setState({ success: true, loading: false });
    } catch (err) {
      this.setState({
        error: err,
        loading: false,
        success: false,
        errorEmail: this.state.email
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({ email: event.target.value });
  }

  getJwtClaims () {
    const token = localStorage.jwt;
    if (!token) {
      return {};
    }
    const [, claims] = token.split('.');
    const parsed = JSON.parse(atob(claims));
    return parsed;
  }

  initialEmail () {
    const claims = this.getJwtClaims();
    return claims.email || '';
  }

  renderErrorMessage () {
    if (!this.state.error) {
      return null;
    }
    if (this.state.error.response && this.state.error.response.status === 404) {
      return <ErrorMessage>We could not find a CG associated with this email. Please try a different email. If continue to have problems, contact <b><a href="mailto:nkechi@realitysf.com">cg@realitysf.com</a></b>.</ErrorMessage>
    }
    return <ErrorMessage>An unknown error has occured.</ErrorMessage>
  }

  renderSuccess () {
    return <>
      Great! Check your email at <b>{this.state.email}</b> for a link to continue.
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
      <LaddaButton
        loading={this.state.loading}
        data-color="blue"
        data-size={S}
        {...(this.state.success ? { disabled: true } : {})}
      >Submit</LaddaButton>
    </>
  }

  render () {
    return <form onSubmit={this.handleSubmit}>
      {
        this.state.success ? this.renderSuccess() : this.renderFormBody()
      }
    </form>
  }
}