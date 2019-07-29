import React, { Component } from 'react';
import LoginForm from "./containers/LoginForm";
import Masthead from "~shared/components/Masthead";
import backendClient from "~shared/clients/backend";
import queryString from "query-string";
import { someAsync } from '~shared/util/promises';
import FormBody from "~shared/components/FormBody";
import BarLoader from 'react-spinners/BarLoader';
import { css } from '@emotion/core';
import CommunityGroupForm from "./containers/CommunityGroupForm";
import ErrorMessage from '~shared/components/ErrorMessage';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: null,
      error: null,
      // the list of community groups that are managed by this user
      groups: null,
      // the list of neighborhoods
      neighborhoods: null,
      configs: null
    };
  }

  async isUserLoggedIn () {
    const query = queryString.parse(window.location.search);
    try {
      await someAsync([
        backendClient.login(query.token),
        backendClient.getMe()
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
      const configs = await backendClient.getConfigs();
      if (await this.isUserLoggedIn()) {
        const [groups, neighborhoods] = await Promise.all([
          backendClient.listCommunityGroups(),
          backendClient.listNeighborhoods()
        ]);
        this.setState({ loading: false, loggedIn: true, groups, neighborhoods, configs });
      } else {
        this.setState({ loading: false, loggedIn: false, configs });
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
    return <CommunityGroupForm
      groups={this.state.groups}
      configs={this.state.configs}
      neighborhoods={this.state.neighborhoods}
    />
  }

  renderError () {
    if (this.state.error) {
      return <ErrorMessage>
        Uh oh! Something unexpected happened. Details:

        <pre>{this.state.error.message}</pre>
      </ErrorMessage>
    }
  }

  render () {
    return <div className="container">
      <Masthead title="Community Group Management Form" />
      <FormBody>
        {this.renderError()}
        {this.renderFormBody()}
      </FormBody>
    </div>
  }
}

export default App;
