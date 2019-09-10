import React, { Component } from "react";
import InputGroup from "../shared/components/InputGroup";
import Label from "../shared/components/Label";
import Input from "../shared/components/Input";
import ButtonLink from "../shared/components/ButtonLink";
import LaddaButton, { S } from "react-ladda/dist/LaddaButton";
import PropTypes from "prop-types";
import { identity } from "lodash";

// @ts-check

class PeopleDetailsForm extends Component {

  static propTypes = {
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onUndoEmailOrPhone: PropTypes.func.isRequired,
    existingPerson: PropTypes.bool,
  }

  constructor (props) {
    super(props);
    this.state = {
      phoneNumber: this.props.phoneNumber || "",
      email: this.props.email || "",
      firstName: this.props.firstName || "",
      lastName: this.props.lastName || ""
    };
  }

  /**
   * Utility function to handle when a field changes
   */
  handleChangeField = (f = identity) => (field) => (value) => {
    this.setState({
      ...this.state,
      [field]: f(value)
    });
  }

  /**
   * Utility method to handle synthetic events
   */
  handleChangeInput = this.handleChangeField((evt) => {
    if (evt.target.type === 'number') {
      return parseInt(evt.target.value);
    }
    return evt.target.value;
  });

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render () {
    return <form onSubmit={this.handleSubmit}>
      Welcome to Reality SF! It seems like we don't have your information yet. Please provide us with some basic information.
      <br />
      <br />
      <ButtonLink onClick={this.props.onUndoEmailOrPhone}>I mistakenly entered the wrong email or phone number</ButtonLink>
      <InputGroup>
        <Label>First Name</Label>
        <Input value={this.state.firstName} onChange={this.handleChangeInput('firstName')} />
      </InputGroup>
      <InputGroup>
        <Label>Last Name</Label>
        <Input value={this.state.lastName} onChange={this.handleChangeInput('lastName')} />
      </InputGroup>
      <InputGroup>
        <Label>Email</Label>
        <Input
          value={this.state.email}
          onChange={this.handleChangeInput('email')}
          disabled={this.props.email && this.props.email.length > 0}
        />
      </InputGroup>
      <InputGroup>
        <Label>Phone Number</Label>
        <Input
          value={this.state.phoneNumber}
          onChange={this.handleChangeInput('phoneNumber')}
          disabled={this.props.phoneNumber && this.props.phoneNumber.length > 0}
        />
      </InputGroup>
      <LaddaButton
        data-size={S}
        data-color="blue"
      >Submit</LaddaButton>
    </form>
  }
}

export default PeopleDetailsForm;
