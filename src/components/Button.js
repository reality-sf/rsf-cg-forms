import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  font-weight: 500;
  font-size: 16px;
  line-height: 42px;
  font-family: 'Helvetica', Arial, sans-serif;
  width: auto;
  white-space: nowrap;
  height: 42px;
  margin: 12px 5px 12px 0;
  padding: 0 22px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: 0;
  border-radius: 3px;
  vertical-align: top;
  background-color: #5d5d5d;
  color: #fff;

  :hover {
    background-color: #444;
  }

  :disabled {
    background-color: #bbb;
    cursor: initial;
  }
`;

export default Button;
