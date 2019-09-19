import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Devices from './Devices';
import CirclingBall from '../CirclingBall';
import MsgBox from '../MsgBox';

Enzyme.configure({ adapter: new Adapter() });

describe('Devices', () => {
  let component;
  beforeEach(() => {
    component = mount(<Devices />);
  });

  it('It should render 2 buttons without errors', () => {
    const wrapper = component.find('button');
    expect(wrapper.length).toBe(2);
  });

  it('It should render CirclingBall without errors', () => {
    const wrapper = component.find(CirclingBall);
    expect(wrapper.length).toBe(1);
  });

  it('It should render error msg when can not fetch data', () => {
    component.setState({ isFetchingDataErr: true });
    const wrapper = component.find(MsgBox);
    expect(wrapper.length).toBe(1);
  });
});
