import { Component } from "react";

/**
 * An extension to a React component, with a helper for syncing field input to state.
 */
export default class FormComponent extends Component {
  /**
   * Utility function to handle when a field changes
   */
  handleChangeField = (f = identity) => (field) => (value) => {
    this.setState({
      ...this.state,
      [field]: f(value)
    });
  }

  /**
   * Utility input change handler that coerces input types to their respective JavaScript values.
   */
  handleChangeInput = this.handleChangeField((evt) => {
    if (evt.target.type === 'number') {
      return parseInt(evt.target.value);
    }
    return evt.target.value;
  });
}
