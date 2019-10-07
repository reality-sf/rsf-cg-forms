import React, { Component } from "react";
import LaddaButton, { S } from "react-ladda";
import planningCenter from "../shared/clients/planningCenter";
import PropTypes from "prop-types";
import NewPersonForm from "./NewPersonForm";
import EntryPointForm from "./EntryPointForm";
import markAttendance from "../util/markAttendance";
import MissingEmailForm from "./MissingEmailForm";

/**
 * The attendance form for newcomers groups. This manages the overall state of the attendance form, using
 * `EntryPointForm` and `NewPersonForm` to gather individual pieces of information.
 */
class AttendanceForm extends Component {

  static propTypes = {
    onMarkedAttendance: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);
    this.state = {

      email: "",
      phoneNumber: "",
      /**
       * The `person` object we've received from planning center, including their phone number and email address.
       */
      planningCenterPerson: null,
      /**
       * The user has submitted their phone number or email address.
       */
      submittedPhoneOrEmail: false,
    };
  }

  handleReceivedPhoneOrEmail = async ({ person, email, phoneNumber }) => {
    if (person && person.emails.length) {
      // If person and their email exists, we already have all the necessary information from this person, so we'll go
      // ahead and mark attendance.
      this.handleReceivedPerson(person);
    } else {
      // Otherwise, we need to collect more information.
      this.setState({ submittedPhoneOrEmail: true, email, phoneNumber, planningCenterPerson: person });
    }
  }

  handleReceivedPerson = async (person) => {
    try {
      await markAttendance(person);
      this.props.onMarkedAttendance();
    } catch (err) {
      this.props.onError(err);
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

  handleUndo = () => {
    this.setState({ submittedPhoneOrEmail: false });
  }

  renderEntryPointForm () {
    return <EntryPointForm
      onReceivedPhoneOrEmail={this.handleReceivedPhoneOrEmail}
      onError={this.props.onError}
    />;
  }

  renderSuccess () {
    return <div>
      Thank you! <br />
      <LaddaButton
        onClick={this.props.onMarkedAttendance}
        data-size={S}
        data-color="blue"
      >Next</LaddaButton>
    </div>;
  }

  renderDetailsForm () {
    const existingInput = {
      email: this.state.email,
      phoneNumber: this.state.phoneNumber
    };
    if (this.state.planningCenterPerson) {
      existingInput.firstName = this.state.planningCenterPerson.attributes.first_name;
      existingInput.lastName = this.state.planningCenterPerson.attributes.last_name;
    }
    if (this.state.planningCenterPerson) {
      return <MissingEmailForm
        {...existingInput}
        planningCenterPerson={this.state.planningCenterPerson}
        onReceivedDetails={this.handleReceivedPerson}
        onUndo={this.handleUndo}
        onError={this.props.onError}
      />;
    } else {
      return <NewPersonForm
        {...existingInput}
        onReceivedDetails={this.handleReceivedPerson}
        onUndo={this.handleUndo}
        onError={this.props.onError}
      />;
    }
  }

  render () {
    if (!this.state.submittedPhoneOrEmail) {
      return this.renderEntryPointForm();
    }
    return this.renderDetailsForm();
  }
}

export default AttendanceForm;
