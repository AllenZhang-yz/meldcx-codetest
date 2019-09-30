import React, { Fragment, Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { LOGIN_PASSWORD } from './mock/loginInfo';
import Login from './components/Login';
import { userService } from './services/user.service';
import { notifyData } from './const/index';
const Devices = React.lazy(() => import('./components/Devices'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: undefined,
      // token: '',
      redirect: false,
      isLoginErr: false,
      notified: false
    };
  }

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
      password: this.state.password
    };
    userService
      .login(authData)
      .then(({ data }) => {
        localStorage.setItem('jwt_token', data);

        this.setState({ redirect: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoginErr: true }, () =>
          setTimeout(() => this.setState({ isLoginErr: false }), 2000)
        );
      });
  };

  logoutHandler = () => {
    localStorage.removeItem('jwt_token');
    this.setState({ redirect: false });
  };

  notifyHandler = () => {
    const notifyHeader = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    };
    userService
      .notify(notifyData, notifyHeader)
      .then(res => {
        this.setState({ notified: true }, () =>
          setTimeout(() => this.setState({ notified: false }), 2000)
        );
      })
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
          render={() => (
            <Suspense fallback={<Loader active inline="centered" />}>
              <Devices
                logoutHandler={this.logoutHandler}
                notifyHandler={this.notifyHandler}
                notified={this.state.notified}
              />
            </Suspense>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
