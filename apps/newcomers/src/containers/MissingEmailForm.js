import React from "react";
import FormComponent from "../shared/components/FormComponent";
import PropTypes from "prop-types";
import InputGroup from "../shared/components/InputGroup";
import Label from "../shared/components/Label";
import LaddaButton, { S } from "react-ladda";
import Input from "../shared/components/Input";
import planningCenter from "../shared/clients/planningCenter";
import ButtonLink from "../shared/components/ButtonLink";

// @ts-check

/**
 * Error case: it's possible that we have a phone number for a person, but not their email address. If the email is
 * missing, we should collect it.
 */
export default class MissingEmailForm extends FormComponent {

  static propTypes = {
    phoneNumber: PropTypes.string,
    planningCenterPerson: PropTypes.object.isRequired,
    onReceivedDetails: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      error: null
    };
  }

  handleSubmitMissingDetails = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      const emailObject = await planningCenter.createPersonEmail(this.props.planningCenterPerson.id, {
        address: this.state.email,
        location: 'Home'
      });
      this.props.onReceivedDetails({
        ...this.props.planningCenterPerson,
        emails: [emailObject]
      });
    } catch (error) {
      this.props.onError(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render () {
    return <>
      Hi {this.props.planningCenterPerson.attributes.first_name}, looks like we're missing your email address.
      <br />
      <br />
      <ButtonLink onClick={this.props.onUndo}>I mistakenly entered the wrong phone number</ButtonLink>
      <form onSubmit={this.handleSubmitMissingDetails}>
        <br />
        <InputGroup>
          <Label>{this.label}</Label>
          <Input
            value={this.state.email}
            autoFocus={true}
            type="email"
            onChange={this.handleChangeInput('email')}
          />
        </InputGroup>
        <LaddaButton data-size={S} data-color="blue" loading={this.state.loading}>Submit</LaddaButton>
      </form>
    </>
  }
}
