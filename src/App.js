import React, { Fragment, Component, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "./axios";
import { LOGIN_PASSCODE } from "./const";
import Login from "./components/Login";
const Devices = React.lazy(() => import("./components/Devices"));

class App extends Component {
  state = {
    email: "",
    password: "",
    isValid: undefined,
    token: "",
    redirect: false,
    isLoginErr: false
  };

  emailInputHandler = e => {
    const email = e.target.value.trim();
    this.setState({ email: email });
  };

  passwordHandler = e => {
    const password = e.target.value;
    this.setState({ password: password });
  };

  submitHandler = e => {
    e.preventDefault();
    this.state.password === LOGIN_PASSCODE
      ? this.setState({ isValid: true })
      : this.setState({ isValid: false }, () =>
          setTimeout(() => this.setState({ isValid: undefined }), 2000)
        );

    const authData = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/login", authData)
      .then(({ data }) => {
        this.setState({ token: data, redirect: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoginErr: true }, () =>
          setTimeout(() => this.setState({ isLoginErr: false }), 2000)
        );
      });
  };

  logoutHandler = () => {
    this.setState({
      email: "",
      password: "",
      isValid: "",
      token: "",
      redirect: false,
      isLoginErr: false
    });
  };

  notifyHandler = () => {
    const notifyHeader = {
      Authorization: this.state.token
    };
    console.log(this.state.token);
    const notifyData = {
      name: "Allen Zhang",
      email: "allen.zhang018@gmail.com",
      repo: "www.github.com",
      message: "Hi, I am almost finished, I am testing this button"
    };
    axios
      .post("/notify", notifyData, notifyHeader)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fragment>
        {this.state.redirect ? <Redirect to="/devices" /> : <Redirect to="/" />}
        <Route
          path="/"
          exact
          render={() => (
            <Login
              emailInputHandler={this.emailInputHandler}
              passwordHandler={this.passwordHandler}
              submitHandler={this.submitHandler}
              email={this.state.email}
              password={this.state.password}
              isValid={this.state.isValid}
              isLoginErr={this.state.isLoginErr}
            />
          )}
        />
        <Route
          path="/devices"
          token={this.state.token}
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Devices
                logoutHandler={this.logoutHandler}
                notifyHandler={this.notifyHandler}
              />
            </Suspense>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
