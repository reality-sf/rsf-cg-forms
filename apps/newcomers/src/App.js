import React, { Component } from 'react';
import Masthead from "~shared/components/Masthead";
import FormBody from "~shared/components/FormBody";
import AttendanceForm from "./containers/AttendanceForm";

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      attendanceSuccesful: false
    }
  }

  handleMarkedAttendance = () => {
    this.setState({ attendanceSuccesful: true });
  }

  render () {
    return <div className="container">
      <Masthead title="Newcomers Community Group"></Masthead>
      <FormBody><AttendanceForm onMarkedAttendance={this.handleMarkedAttendance} /></FormBody>
    </div>
  }
}

export default App;
