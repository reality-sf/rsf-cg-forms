import React from "react";
import InputGroup from "../shared/components/InputGroup";
import Label from "../shared/components/Label";
import Input from "../shared/components/Input";
import ButtonLink from "../shared/components/ButtonLink";
import LaddaButton, { S } from "react-ladda/dist/LaddaButton";
import PropTypes from "prop-types";
import FormComponent from "../shared/components/FormComponent";
import planningCenter from "../shared/clients/planningCenter";

// @ts-check

class NewPersonForm extends FormComponent {

  static propTypes = {
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onReceivedDetails: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);
    this.state = {
      phoneNumber: this.props.phoneNumber || "",
      email: this.props.email || "",
      firstName: this.props.firstName || "",
      lastName: this.props.lastName || "",
      loading: false
    };
  }

  /**
   * Edge case: We might already have this person's email on file. If that's the case, they came into the form with
   * another phone number. We'll treat this as an alternate number for them.
   */
  updateExistingPerson = async () => {
    const [person] = await planningCenter.findPerson({
      where: {
        search_name_or_email_or_phone_number: this.state.email
      }
    });
    if (!person) {
      return false;
    }
    const phoneNumber = await planningCenter.createPersonPhoneNumber(person.id, { number: this.state.phoneNumber, location: 'Home' });
    const emails = await planningCenter.listPersonEmail(person.id);
    return {
      ...person,
      emails,
      phoneNumbers: [phoneNumber]
    }
  }

  createPerson = async () => {
    const person = await planningCenter.createPerson({
      first_name: this.state.firstName,
      last_name: this.state.lastName
    });
    const [email, phoneNumber] = await Promise.all([
      planningCenter.createPersonEmail(person.id, {
        address: this.state.email,
        location: 'Home'
      }),
      planningCenter.createPersonPhoneNumber(person.id, {
        number: this.state.phoneNumber,
        location: 'Home'
      })
    ]);
    return {
      ...person,
      emails: [email],
      phoneNumbers: [phoneNumber]
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const person = await this.updateExistingPerson() || await this.createPerson();
      this.props.onReceivedDetails(person);
    } catch (err) {
      this.props.onError(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  render () {
    return <>
      Welcome to Reality SF! It seems like we don't have your information yet. Please provide us with some basic information.
      <br />
      <br />
      <ButtonLink onClick={this.props.onUndo}>I mistakenly entered the wrong phone number</ButtonLink>
      <form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Label>First Name</Label>
          <Input value={this.state.firstName} onChange={this.handleChangeInput('firstName')} required autoFocus />
        </InputGroup>
        <InputGroup>
          <Label>Last Name</Label>
          <Input value={this.state.lastName} onChange={this.handleChangeInput('lastName')} required />
        </InputGroup>
        <InputGroup>
          <Label>Email</Label>
          <Input
            value={this.state.email}
            onChange={this.handleChangeInput('email')}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Phone Number</Label>
          <Input
            value={this.state.phoneNumber}
            disabled
          />
        </InputGroup>
        <LaddaButton
          data-size={S}
          data-color="blue"
          type="submit"
          loading={this.state.loading}
        >Submit</LaddaButton>
      </form>
    </>
  }
}

export default NewPersonForm;
