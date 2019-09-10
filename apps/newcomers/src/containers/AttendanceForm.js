import React, { Component } from "react";
import LaddaButton, { S } from "react-ladda";
import planningCenter from "../shared/clients/planningCenter";
import PropTypes from "prop-types";
import PeopleDetailsForm from "./PeopleDetailsForm";
import EntryPointForm from "./EntryPointForm";
import markAttendance from "../util/markAttendance";

/**
 * The attendance form for newcomers groups. This manages the overall state of the attendance form, using
 * `EntryPointForm` and `PeopleDetailsForm` to gather individual pieces of information.
 */
class AttendanceForm extends Component {

  static propTypes = {
    onMarkedAttendance: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      phoneOrEmail: "",
      /**
       * The `person` object we've received from planning center, including their phone number and email address.
       */
      planningCenterPerson: null,
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

  findPlanningCenterPerson = async (phoneOrEmail) => {
    const [person] = await planningCenter.findPerson({
      where: {
        search_name_or_email_or_phone_number: phoneOrEmail
      }
    });
    if (!person) {
      return null;
    }
    const [emails, phoneNumbers] = await Promise.all([
      planningCenter.listPersonEmail(person.id),
      planningCenter.listPersonPhoneNumber(person.id)
    ])
    return {
      ...person,
      emails,
      phoneNumbers
    };
  }

  handleSubmitPhoneOrEmail = async (phoneOrEmail) => {
    try {
      const person = await this.findPlanningCenterPerson(phoneOrEmail)
      if (person && person.emails.length && person.phoneNumbers.length) {
        try {
          await markAttendance(person, phoneOrEmail);
          this.setState({ success: true, submittedPhoneOrEmail: true, loading: false });
        } catch (err) {
          this.setState({ error: err });
        }
      } else {
        this.setState({ submittedPhoneOrEmail: true, phoneOrEmail, loading: false, planningCenterPerson: person });
      }
    } catch (err) {
      this.setState({ loading: false, error: err });
    }
  }

  handleSubmitDetails = async (details) => {
    const person = await planningCenter.createPerson({
      first_name: details.firstName,
      last_name: details.lastName
    });
    await Promise.all([
      planningCenter.createPersonEmail(person.id, {
        address: details.email,
        location: 'Home'
      }),
      planningCenter.createPersonPhoneNumber(person.id, {
        number: details.phoneNumber,
        location: 'Home'
      })
    ]);
  }

  handleUndoEmailOrPhone = () => {
    this.setState({ submittedPhoneOrEmail: false });
  }

  renderEntryPointForm () {
    return <EntryPointForm onSubmitPhoneOrEmail={this.handleSubmitPhoneOrEmail} />
  }

  renderSuccess () {
    return <div>
      Thank you! <br />
      <LaddaButton
        onClick={this.props.onMarkedAttendance}
        data-size={S}
        data-color="blue"
      >Next</LaddaButton>
    </div>
  }

  renderDetailsForm () {
    const existingInput = {};
    if (this.state.planningCenterPerson) {
      existingInput.firstName = this.state.planningCenterPerson.attributes.first_name;
      existingInput.lastName = this.state.planningCenterPerson.attributes.last_name;
    }
    if (this.state.phoneOrEmail.includes('@')) {
      existingInput.email = this.state.phoneOrEmail;
    } else {
      existingInput.phoneNumber = this.state.phoneOrEmail;
    }
    return <PeopleDetailsForm
      {...existingInput}
      existingPerson={true}
      onSubmit={this.handleSubmitDetails}
      onUndoEmailOrPhone={this.handleUndoEmailOrPhone}
    />
  }

  render () {
    if (!this.state.submittedPhoneOrEmail) {
      return this.renderEntryPointForm();
    }
    if (this.state.success) {
      return this.renderSuccess();
    }
    return this.renderDetailsForm();
  }
}

export default AttendanceForm;
