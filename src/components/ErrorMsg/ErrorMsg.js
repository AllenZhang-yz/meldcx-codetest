import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ErrorMessage = styled.div`
  background-color: #ed8291;
  border-radius: 3px;
  border: 1px solid #e01935;
  width: 150px;
  margin: 10px auto 0 auto;
  padding: 6px;
  color: #ffffff;
  font-size: 12px;
`;

const ErrorMsg = props => <ErrorMessage>{props.children}</ErrorMessage>;

ErrorMsg.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorMsg;
