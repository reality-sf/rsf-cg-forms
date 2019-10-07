import React, { Component } from "react";
import styled from "styled-components";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const RELOAD_DELAY = 2000;

const SuccessMessage = styled.div`
  text-align: center;
  .react-sweet-progress-line-inner {
    transition: width ${RELOAD_DELAY - 300}ms cubic-bezier(0.59, 0, 1, 1);
  }
`;

class Success extends Component {
  constructor (props) {
    super(props);
    this.state = {
      percent: 0
    };
    // This makes the progress bar transition to 100%.
    setTimeout(() => {
      this.setState({ percent: 100 });
    }, 10);
    // After the progress bar fills up, reload the window so the next guest can fill in the form.
    setTimeout(() => {
      window.location.reload();
    }, RELOAD_DELAY);
  }

  render () {
    return <SuccessMessage>
      Thank you!
      <Progress status="success" percent={this.state.percent}/>
    </SuccessMessage>;
  }
}

export default Success;
