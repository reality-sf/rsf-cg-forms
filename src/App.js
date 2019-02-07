import React, { Component } from 'react';
import LoginForm from "./containers/LoginForm";
import Masthead from "./containers/Masthead";
import "./styles/App.css";
import airtableProxyApi from "./clients/airtableProxyApi";
import queryString from "query-string";
import { someAsync } from './util/promises';
import { formWrapper } from './styles/Form.module.css'
import BarLoader from 'react-spinners/BarLoader';
import { css } from '@emotion/core';
import CommunityGroupForm from "./containers/CommunityGroupForm";

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: null,
      error: null,
      // the list of community groups that are managed by this user
      groups: null,
      // the group that we're editing information for
      editingGroup: null
    };
  }

  async isUserLoggedIn () {
    const query = queryString.parse(window.location.search);
    try {
      await someAsync([
        airtableProxyApi.login(query.token),
        airtableProxyApi.getMe()
      ]);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * On mount, determine if the user is logged in or not. If not, we need to send them to the Login form.
   */
  async componentDidMount () {
    try {
      if (await this.isUserLoggedIn()) {
        const groups = await airtableProxyApi.listCommunityGroups();
        this.setState({ loading: false, loggedIn: true, groups });
      } else {
        this.setState({ loading: false, loggedIn: false });
      }
    } catch (err) {
      this.setState({ error: err, loading: false });
    }
  }

  renderFormBody () {
    if (this.state.loggedIn === null) {
      const style = css`
        margin: 0 auto;
      `;
      return <BarLoader loading={this.state.loading} color="#123abc" css={style} />
    }
    if (!this.state.loggedIn) {
      return <LoginForm />;
    }
    return <CommunityGroupForm groups={this.state.groups}></CommunityGroupForm>
  }

  render () {
    return <div className="container">
      <Masthead title="Community Group Management Form" />
      <div className={formWrapper}>
        {this.renderFormBody()}
      </div>
    </div>
  }
}

export default App;
