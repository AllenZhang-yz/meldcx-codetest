import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MessageBox = styled.div`
  background-color: ${props => (props.notify ? '#42db6b' : '#ed8291')};
  border-radius: 3px;

  border: 1px solid ${props => (props.notify ? '#0ba133' : '#e01935')};
  width: 150px;
  margin: 10px auto 0 auto;
  padding: 6px;
  color: #ffffff;
  font-size: 12px;
`;

const ErrorMsg = props => <MessageBox>{props.children}</MessageBox>;

ErrorMsg.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MessageBox;
