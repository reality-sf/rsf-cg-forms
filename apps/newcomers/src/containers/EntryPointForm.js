import InputGroup from "../shared/components/InputGroup";
import LaddaButton, { S } from "react-ladda";
import Label from "../shared/components/Label";
import Input from "../shared/components/Input";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { findPlanningCenterPerson } from "../util/planningCenterUtils";
import InputMask from "react-input-mask";

/**
 * The entry point to the attendance form. Accepts phone or email input.
 */
class EntryPointForm extends Component {

  static propTypes = {
    onReceivedPhoneOrEmail: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  };

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

  handleSubmitPhoneOrEmail = async (evt) => {
    try {
      evt.preventDefault();
      this.setState({ loading: true });
      const person = await findPlanningCenterPerson(this.state.phoneOrEmail);
      const type = this.state.phoneOrEmail.includes('@') ? "email" : "phoneNumber";
      if (person) {
        this.props.onReceivedPhoneOrEmail({ person });
      } else {
        this.props.onReceivedPhoneOrEmail({ [type]: this.state.phoneOrEmail });
      }
    } catch (err) {
      this.setState({ loading: false });
      this.props.onError(err);
    }
  }

  render () {
    return <form onSubmit={this.handleSubmitPhoneOrEmail}>
      <InputGroup>
        <Label htmlFor="phoneOrEmail">Your phone number</Label>
        <InputMask mask="(999) 999-9999" value={this.state.phoneOrEmail} onChange={this.handleChangePhoneOrEmail} required>
          {(inputProps) => <Input {...inputProps} id="phoneOrEmail" type="tel" />}
        </InputMask>
      </InputGroup>
      <LaddaButton
        loading={this.state.loading}
        data-color="blue"
        data-size={S}
        type="submit"
        {...(this.state.success && { disabled: true })}
      >Submit</LaddaButton>
    </form>;
  }
}

export default EntryPointForm;
