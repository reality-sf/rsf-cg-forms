import React, { Component } from "react";
import InputGroup from "../shared/components/InputGroup";
import Input from "../shared/components/Input";
import Label from "../shared/components/Label";
import LaddaButton, { S } from "react-ladda";
import backendClient from "../shared/clients/backend";
import PropTypes from "prop-types";
import PeopleDetailsForm from "./PeopleDetailsForm";

class AttendanceForm extends Component {

  static propTypes = {
    onMarkedAttendance: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      phoneOrEmail: "",
      firstName: "",
      lastName: "",
      
      /**
       * The user has submitted their phone number or email address.
       */
      submittedPhoneOrEmail: false,
      /**
       * We have marked attendance. At this phase, we're showing a button to complete the attendance.
       */
      success: false,
      loading: false,
      error: null,
    };
  }

  handleChangePhoneOrEmail = (event) => {
    this.setState({ phoneOrEmail: event.target.value });
  }

  handleSubmitPhoneOrEmail = async (evt) => {
    evt.preventDefault();
    this.setState({ loading: true });
    try {
      const [person] = await backendClient.findPerson({
        where: {
          search_name_or_email_or_phone_number: this.state.phoneOrEmail
        }
      });
      if (person) {
        await this.handleMarkAttendance(person);
        this.setState({ succes: true });
      } else {
        this.setState({ submittedPhoneOrEmail: true });
      }
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false, error: err });
    }
  }

  renderPromptFormOrEmail () {
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

  renderSuccess () {
    return <div>
      Thank you!
      <LaddaButton
        onClick={this.props.onMarkedAttendance}
        data-size={S}
        data-color="blue"
      >Next</LaddaButton>
    </div>
  }

  renderDetailsForm () {
    const existingInput = this.state.phoneOrEmail.includes('@') ? { email: this.state.phoneOrEmail } : { phoneNumber: this.state.phoneOrEmail }
    return <PeopleDetailsForm
      {...existingInput}
      onSubmit={this.handleSubmitDetails}
    />
  }

  render () {
    if (!this.state.submittedPhoneOrEmail) {
      return this.renderPromptFormOrEmail();
    }
    if (this.state.success) {
      return this.renderSuccess();
    }
    return this.renderDetailsForm();
  }
}

export default AttendanceForm;
