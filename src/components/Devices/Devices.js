import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CirclingBall from '../CirclingBall';
import MsgBox from '../MsgBox';
import { userService } from '../../services/user.service';

const DevicesPage = styled.div`
  background-color: #f07205;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const RepositionCirclingBall = styled.div`
  margin-top: 200px;
`;

const Footer = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgba(161, 158, 157, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 80px;
  height: 35px;
  text-align: center;
  text-transform: uppercase;
  border: none;
  border-radius: 3px;
  margin: 0 10px;
  cursor: pointer;
  outline: none;
  background-color: ${props => (props.notify ? '#ffffff' : '#000000')};
  color: ${props => (props.notify ? '#000000' : '#ffffff')};
`;

const NotifiedMsgWrapper = styled.div`
  margin-top: 220px;
`;
class Devices extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deviceNumber: 0,
      isFetchingDataErr: false
    };
  }

  getDevicesInfo = () => {
    userService
      .getDevices()
      .then(res => this.setState({ deviceNumber: res.data.devices.length }))
      .catch(err => {
        console.log(err);
        this.setState({ isFetchingDataErr: true });
      });
  };

  componentDidMount() {
    this.getDevicesInfo();
    setInterval(this.getDevicesInfo, 5000);
  }

  render() {
    const { notifyHandler, logoutHandler, notified } = this.props;
    return (
      <DevicesPage>
        {this.state.isFetchingDataErr && <MsgBox>Could not get data</MsgBox>}
        <RepositionCirclingBall>
          <CirclingBall number={this.state.deviceNumber} />
        </RepositionCirclingBall>
        {notified && (
          <NotifiedMsgWrapper>
            <MsgBox notify>You have notified MeldCX successfully</MsgBox>
          </NotifiedMsgWrapper>
        )}
        <Footer>
          <Button notify onClick={notifyHandler}>
            notify
          </Button>
          <Button onClick={logoutHandler}>log out</Button>
        </Footer>
      </DevicesPage>
    );
  }
}

Devices.propTypes = {
  logoutHandler: PropTypes.func,
  notifyHandler: PropTypes.func,
  notified: PropTypes.bool
};

export default Devices;
