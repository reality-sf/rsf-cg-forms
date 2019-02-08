import styled from "styled-components";

const ErrorMessage = styled.div`
  background-color: #e74c3c;
  padding: 8px;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 10px;
  > a {
    text-decoration: underline;
    cursor: pointer;
  }
  > button {
    background: none !important;
    color: inherit;
    border: none; 
    padding: 0 !important;
    font: inherit;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default ErrorMessage;
