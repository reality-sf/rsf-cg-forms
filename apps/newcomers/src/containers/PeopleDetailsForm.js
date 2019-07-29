import React, { Component } from "react";
import InputGroup from "~shared/components/InputGroup";
import Label from "~shared/components/Label";
import Input from "~shared/components/Input";
import LaddaButton, { S } from "react-ladda/dist/LaddaButton";
import PropTypes from "prop-types";
import { identity } from "lodash";

class PeopleDetailsForm extends Component {

  static propTypes = {
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
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


  render () {
    return <form onSubmit={this.props.onSubmit}>
      <InputGroup>
        <Label>First Name</Label>
        <Input value={this.state.firstName} onChange={this.handleChangeInput('firstName')}></Input>
      </InputGroup>
      <InputGroup>
        <Label>Last Name</Label>
        <Input value={this.state.lastName} onChange={this.handleChangeInput('lastName')}></Input>
      </InputGroup>
      <InputGroup>
        <Label>Email</Label>
        <Input value={this.state.email} onChange={this.handleChangeInput('email')}></Input>
      </InputGroup>
      <InputGroup>
        <Label>Phone Number</Label>
        <Input value={this.state.phoneNumber} onChange={this.handleChangeInput('phoneNumber')}></Input>
      </InputGroup>
      <LaddaButton
        data-size={S}
        data-color="blue"
      >Submit</LaddaButton>
    </form>
  }
}

export default PeopleDetailsForm;
