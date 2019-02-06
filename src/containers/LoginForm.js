import { Component } from "react";
import Form from "../components/Form";
import InputGroup from "../components/InputGroup";
import Label from "../components/Label";
import Input from "../components/Input";
import React, { Fragment } from "react";
import Button from "../components/Button";
import airtableProxyApi from "../clients/airtableProxyApi";

export default class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      success: false,
      error: null
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await airtableProxyApi.sendEmailLink(this.state.email);
      this.setState({ success: true });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  handleInputChange = (event) => {
    this.setState({ email: event.target.value });
  }

  renderSuccess () {
    return <div>Success!</div>
  }

  renderEmailForm () {
    return <Fragment>
      <div>To provide community group information, please enter your email address below, and we'll email you a link to get started.</div>
      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="text" id="email" value={this.state.email} onChange={this.handleInputChange}></Input>
      </InputGroup>
      <Button>Submit</Button>
    </Fragment>
  }

  render () {
    return <Form onSubmit={this.handleSubmit}>
      {
        this.state.success ? this.renderSuccess() : this.renderEmailForm()
      }
    </Form>
  }
}