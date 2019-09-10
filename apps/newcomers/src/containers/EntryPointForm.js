import InputGroup from "../shared/components/InputGroup";
import LaddaButton, { S } from "react-ladda";
import Label from "../shared/components/Label";
import Input from "../shared/components/Input";
import React, { Component } from "react";

/**
 * The entry point to the attendance form. Accepts phone or email input.
 */
class EntryPointForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      phoneOrEmail: "",
    }
  }

  handleChangePhoneOrEmail = (event) => {
    this.setState({ phoneOrEmail: event.target.value });
  }

  handleSubmitPhoneOrEmail = (evt) => {
    evt.preventDefault();
    this.setState({ loading: true });
    this.props.onSubmitPhoneOrEmail(this.state.phoneOrEmail);
  }

  render () {
    return <form onSubmit={this.handleSubmitPhoneOrEmail}>
      <InputGroup>
        <Label htmlFor="phoneOrEmail">Phone numer or email</Label>
        <Input id="phoneOrEmail" type="text" value={this.state.phoneOrEmail} onChange={this.handleChangePhoneOrEmail} />
      </InputGroup>
      <LaddaButton
        loading={this.state.loading}
        data-color="blue"
        data-size={S}
        {...(this.state.success ? { disabled: true } : {})}
      >Submit</LaddaButton>
    </form>;    
  }
}

export default EntryPointForm;
