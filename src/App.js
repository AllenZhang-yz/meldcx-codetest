import React, { Fragment, Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN_PASSWORD } from './mock/loginInfo';
import Login from './components/Login';
import { userService } from './services/user.service';
const Devices = React.lazy(() => import('./components/Devices'));

class App extends Component {
  state = {
    email: '',
    password: '',
    isValid: undefined,
    token: '',
    redirect: false,
    isLoginErr: false,
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
    this.state.password === LOGIN_PASSWORD
      ? this.setState({ isValid: true })
      : this.setState({ isValid: false }, () =>
          setTimeout(() => this.setState({ isValid: undefined }), 2000)
        );
    const authData = {
      email: this.state.email,
      password: this.state.password,
    };
    userService
      .login(authData)
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
      email: '',
      password: '',
      isValid: '',
      token: '',
      redirect: false,
      isLoginErr: false,
    });
  };

  notifyHandler = () => {
    const notifyHeader = JSON.stringify({
      headers: `Bearer ${this.state.token}`,
    });
    const notifyData = JSON.stringify({
      name: 'Allen Zhang',
      email: 'allen.zhang018@gmail.com',
      repoUrl: 'https://github.com/AllenZhang-yz/meldcx-codetest.git',
      message: 'Hi, I am almost there, I really wanna join MeldCX. ',
    });
    userService
      .notify(notifyHeader, notifyData)
      .then(res => console.log('res', res))
      .catch(err => console.log('err', err));
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
