import React, { Component } from 'react';
import LoginForm from "./containers/LoginForm";
import Masthead from "./containers/Masthead";
import "./styles/App.css";
import airtableProxyApi from "./clients/airtableProxyApi";
import queryString from "query-string";


class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  // upon mount, determine if the user is logged in or not. If not, we need to send them to the Login form.
  async componentDidMount () {
    try {
      await airtableProxyApi.getMe();
    } catch (err) {
      const query = queryString.parse(window.location.search);
      if (query.token) {
        await airtableProxyApi.login(query.token);
      }
    }
  }

  render () {
    return <div>
      <div className="container">
        <Masthead title="Community Group Management Form" />
        <LoginForm />
      </div>
    </div>
  }
}

export default App;
