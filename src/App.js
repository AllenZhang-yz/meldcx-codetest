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
    isValid: "",
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
      : this.setState({ isValid: false });

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
        this.setState({ isLoginErr: true });
      });
  };

  // componentDidUpdate() {
  //   setTimeout(() => this.setState({ isLoginErr: false }), 5000);
  // }

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
              <Devices logoutHandler={this.logoutHandler} />
            </Suspense>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
