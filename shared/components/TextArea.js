import styled from "styled-components";

const TextArea = styled.textarea`
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
  display: block;
  &::placeholder {
    color: #ddd;
  }
`;

export default TextArea;
