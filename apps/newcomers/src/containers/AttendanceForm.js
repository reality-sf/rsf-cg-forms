import React, { Component } from "react";
import LaddaButton, { S } from "react-ladda";
import planningCenter from "../shared/clients/planningCenter";
import PropTypes from "prop-types";
import PeopleDetailsForm from "./PeopleDetailsForm";
import EntryForm from "./EntryForm";

/**
 * The attendance form for newcomvers groups. This manages the overall state of the attendance form, using
 * `EntryForm` and `PeopleDetailsForm` to gather individual pieces of information.
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

  handleSubmitPhoneOrEmail = async (phoneOrEmail) => {
    try {
      const [person] = await planningCenter.findPerson({
        where: {
          search_name_or_email_or_phone_number: phoneOrEmail
        }
      });
      if (person) {
        await this.handleMarkAttendance(person);
        this.setState({ succes: true, loading: false });
      } else {
        this.setState({ submittedPhoneOrEmail: true, phoneOrEmail, loading: false });
      }
    } catch (err) {
      this.setState({ loading: false, error: err });
    }
  }

  handleSubmitDetails = async (details) => {
    
  }

  handleUndoEmailOrPhone = () => {
    this.setState({ submittedPhoneOrEmail: false });
  }

  renderEntryForm () {
    return <EntryForm onSubmitPhoneOrEmail={this.handleSubmitPhoneOrEmail} />
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
      onUndoEmailOrPhone={this.handleUndoEmailOrPhone}
    />
  }

  render () {
    if (!this.state.submittedPhoneOrEmail) {
      return this.renderEntryForm();
    }
    if (this.state.success) {
      return this.renderSuccess();
    }
    return this.renderDetailsForm();
  }
}

export default AttendanceForm;
