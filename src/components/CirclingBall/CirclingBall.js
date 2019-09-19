import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const CirclingBallWraper = styled.div`
  position: absolute;
  transform: translateX(-130px);
`;

const Ball = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Animate = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  margin: 0 auto;
  animation: ${spin} 3000ms infinite linear;
`;

const Static = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
`;

const DeviceNums = styled.div`
  color: #ffffff;
  transform: translateY(110px);
  font-size: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
`;

const DeviceNumWords = styled.div`
  font-size: 15px;
  text-transform: uppercase;
`;

const circlelingBall = props => {
  const { number } = props;
  const angle = 360 / number;
  const balls = [];
  for (let i = 0; i < number; i++) {
    const eachAngle = i * angle;
    balls.push(
      <Static key={eachAngle} style={{ transform: `rotate(${eachAngle}deg)` }}>
        <Ball></Ball>
      </Static>
    );
  }

  return (
    <Fragment>
      <CirclingBallWraper>
        <Animate>{balls}</Animate>
      </CirclingBallWraper>
      <DeviceNums>
        <div>{number}</div>
        <DeviceNumWords>devices online</DeviceNumWords>
      </DeviceNums>
    </Fragment>
  );
};

circlelingBall.propTypes = {
  number: PropTypes.number
};

export default circlelingBall;
