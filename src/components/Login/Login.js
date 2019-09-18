import React, { memo } from "react";
import styled from "styled-components";
import { Email } from "styled-icons/material/Email";
import { Exclamation } from "styled-icons/evil/Exclamation";
import PropTypes from "prop-types";
import ErrorMsg from "../ErrorMsg";

const LoginPage = styled.div`
  background-color: grey;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 350px;
  height: 300px;
  margin: 0 auto;
  background-color: #ffffff;
  text-align: center;
`;

const LoginLable = styled.div`
  font-size: 40px;
  font-weight: normal;
  margin: 30px 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
  align-items: center;
  margin: 0 auto;
  position: relative;
`;

const Input = styled.input`
  margin: 2px 0;
  height: 25px;
  width: 250px;
  padding-left: 30px;
  background-color: #dcdfe0;
  border: none;
  border-radius: 3px;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  width: 90px;
  height: 40px;
  background-color: #538eed;
  color: #ffffff;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

const EmailIcon = styled(Email)`
  height: 20px;
  width: auto;
  position: absolute;
  right: 243px;
  top: 6px;
`;

const ExclamationIcon = styled(Exclamation)`
  height: 20px;
  width: auto;
  position: absolute;
  right: 243px;
  top: 37px;
`;

const Login = props => {
  const {
    emailInputHandler,
    passwordHandler,
    submitHandler,
    email,
    password,
    isValid,
    isLoginErr
  } = props;
  return (
    <LoginPage>
      <LoginContainer>
        <LoginLable>Login</LoginLable>
        <LoginForm>
          <EmailIcon />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={emailInputHandler}
            value={email}
          />
          <ExclamationIcon />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={passwordHandler}
            value={password}
          />

          <SubmitButton onClick={submitHandler}>log in</SubmitButton>
        </LoginForm>
        {isValid === false && <ErrorMsg>Incorrect Password</ErrorMsg>}
        {isLoginErr && isValid && (
          <ErrorMsg>Something's wrong with backend</ErrorMsg>
        )}
      </LoginContainer>
    </LoginPage>
  );
};

Login.propTypes = {
  emailInputHandler: PropTypes.func,
  passwordHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  isLoginErr: PropTypes.bool
};

export default memo(Login);
