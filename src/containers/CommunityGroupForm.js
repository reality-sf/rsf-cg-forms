import React, { Component } from "react";
import Button from "../components/Button";
import Select from "react-select";
import Label from "../components/Label";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";
import MeetingNight from "../components/MeetingNight";
import TextArea from "../components/TextArea";
import airtableProxyApi from "../clients/airtableProxyApi";
import LaddaButton, { S, XS } from "react-ladda";
import ErrorMessage from "../components/ErrorMessage";

const identity = (value) => value;

export default class CommunityGroupForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      // if there's one 1 group, there's no need to ask the user to select a CG.
      currentGroup: this.props.groups.length > 1 ? null : this.normalizeGroup(this.props.groups[0]),
      groups: this.props.groups.map((group) => {
        return {
          label: group['CG Name'],
          value: group
        };
      }),
      loading: false,
      success: false,
      error: null
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      await airtableProxyApi.updateCommunityGroup(this.state.currentGroup);
      this.setState({ loading: false, success: true });
    } catch (err) {
      this.setState({ loading: false, error: err });
    }
  }

  /**
   * Utility function to handle when a field changes
   */
  handleChangeField = (f = identity) => (field) => (value) => {
    this.setState({
      currentGroup: {
        ...this.state.currentGroup,
        [field]: f(value)
      }
    });
  }

  /**
   * Utility method to handle synthetic events
   */
  handleChangeInput = this.handleChangeField((evt) => {
    if (evt.target.type === 'number') {
      return parseInt(evt.target.value);
    }
    return evt.target.value;
  });

  /**
   * Normalize a group to what we want to expose to the user.
   *
   * We want to expose a CG's capacity as the delta of what they last reported their capacity was, and the
   * placements we've created since. Next time a user reports new capacity, we'll archive all placements since then,
   * and set the new value as "Capacity Available".
   */
  normalizeGroup (group) {
    return {
      ...group,
      'Capacity Available': group['Capacity Remaining']
    }
  }

  handleChangeGroup = (group) => {
    this.setState({ currentGroup: this.normalizeGroup(group) });
  }

  handleChangeMeetingNight = this.handleChangeField((option) => option.value)('Meeting Night');

  handleReload = () => {
    window.location.reload()
  }

  renderErrorMessage () {
    const error = this.state.error;
    if (!error) {
      return;
    }
    if (error.response && error.response.status === 403) {
      return <ErrorMessage>The current session has expired. To continue, please reload the page to be able to get another email link.
        <br />
        <br />
        <button onClick={this.handleReload}>Reload</button>
      </ErrorMessage>
    }
    if (error.response) {
      return <ErrorMessage>Uh oh, something went wrong when trying to submit your changes. The HTTP call responded with unexpected status {error.response.status}. Response body: {JSON.stringify(error.response.data)}</ErrorMessage>
    }
    return <ErrorMessage>Uh oh, an unexpected error occured. Details: <pre>{error.message}</pre></ErrorMessage>
  }

  renderSuccessMessage () {
    if (!this.state.success) {
      return null;
    }
    return <>
      <p>Thank you for updating!</p>
      <LaddaButton
        onClick={this.handleReload}
        data-color="blue"
        data-size={S}
      >Make Additional Changes</LaddaButton>
    </>
  }

  renderGroupSelect () {
    if (this.props.groups.length <= 1) {
      return null;
    }
    return <>
      <InputGroup>
        <Label>Select your community group</Label>
        <Select
          options={this.props.groups}
          getOptionLabel={(group) => group['CG Name']}
          name="Community Group"
          onChange={this.handleChangeGroup}
        />
      </InputGroup>
    </>
  }

  renderCgForm () {
    const group = this.state.currentGroup;
    if (!group || this.state.success) {
      return null;
    }
    return <>
      <h3>Editing {group['CG Name']}</h3>
      <InputGroup>
        <Label htmlFor="capacity-available">How many new members can you support?</Label>
        <Input id="capacity-available" type="number" value={group['Capacity Available']} onChange={this.handleChangeInput('Capacity Available')}></Input>
      </InputGroup>
      <InputGroup>
        <Label htmlFor="meeting-night">When do you meet?</Label>
        <MeetingNight value={group['Meeting Night']} onChange={this.handleChangeMeetingNight} />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="meeting-start-time">When does your community group start?</Label>
        <Input id="meeting-start-time" type="text" value={group['Meeting Start Time']} onChange={this.handleChangeInput('Meeting Start Time')}></Input>
      </InputGroup>
      <InputGroup>
        <Label htmlFor="meeting-end-time">When does your community group end?</Label>
        <Input id="meeting-end-time" type="text" value={group['Meeting End Time']} onChange={this.handleChangeInput('Meeting End Time')}></Input>
      </InputGroup>
      <InputGroup>
        <Label htmlFor="meeting-address">What is your meeting address?</Label>
        <TextArea id="meeting-address" value={group['Meeting Address']} onChange={this.handleChangeInput('Meeting Address')}></TextArea>
      </InputGroup>
      <div>If you would like to inform us of leadership or other changes or requests, please send an email to <a href="mailto:cg@realitysf.com" target="_blank" rel="noopener noreferrer">cg@realitysf.com</a></div>
      <br/>
      { this.renderErrorMessage() }
      <LaddaButton
        loading={this.state.loading}
        data-color="blue"
        data-size={S}
        {...(this.state.success ? { disabled: true } : {})}
      >Submit</LaddaButton>
    </>;
  }

  render () {
    return <form onSubmit={this.handleSubmit}>
      { this.renderSuccessMessage() }
      { this.renderGroupSelect() }
      { this.renderCgForm() }
    </form>;
  }
}