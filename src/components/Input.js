import styled from "styled-components";

const Input = styled.input`
  font-family: Helvetica;
  font-size: 14px;
  color: #5d5d5d !important;
  display: block;
  margin: 3px 0 12px 0;
  padding: 10px;
  background: #fff;
  width: 100%;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  -webkit-appearance: none;
  &:focus {
    border-color: #222;
    outline: none;
  }
`;

export default Input;
