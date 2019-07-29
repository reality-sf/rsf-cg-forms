import React from "react";
import logo from "~shared/images/logo.png";
import styled from "styled-components";

const MastheadWrapper = styled.h1`
  font-size: 28px;
  line-height: 110%;
  margin-bottom: 30px;
  margin-top: 0;
  padding: 0;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  text-align: center;
`;

const Masthead = (props) => {
  return <MastheadWrapper>
    <div>
      <img src={logo} alt="Reality SF" width="150px" />
      <br />
      <br />
      <span>{props.title}</span>
    </div>
  </MastheadWrapper>
}

export default Masthead;
