import React, { Component } from 'react';
import Masthead from "./shared/components/Masthead";
import ErrorMessage from "./shared/components/ErrorMessage";
import FormBody from "./shared/components/FormBody";
import AttendanceForm from "./containers/AttendanceForm";
import Success from './containers/Success';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      attendanceSuccesful: false,
      error: null
    }
  }

  /**
   * Cause `<Success/>` to render, which reloads the page after 2 seconds.
   */
  handleMarkedAttendance = () => {
    this.setState({ attendanceSuccesful: true });
  }

  handleError = (error) => {
    this.setState({ error });
  }

  renderError() {
    if (this.state.error) {
      return <ErrorMessage>
        Uh oh! Something unexpected happened. Details:

        <pre>{this.state.error.message}</pre>
      </ErrorMessage>
    }
  }

  renderAttendanceForm() {
    if (this.state.attendanceSuccesful) {
      // NOTE: This will refresh the page after 3.5 seconds.
      return <Success />
    } else {
      return <AttendanceForm
        onMarkedAttendance={this.handleMarkedAttendance}
        onError={this.handleError}
      />
    }
  }

  render () {
    return <div className="container">
      <Masthead title="Newcomers Community Group"></Masthead>
      <FormBody>
        {this.renderError()}
        {this.renderAttendanceForm()}
      </FormBody>
    </div>
  }

}

export default App;
