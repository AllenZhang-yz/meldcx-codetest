import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login';
import MsgBox from '../MsgBox';

Enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
  let component;
  beforeEach(() => {
    component = mount(<Login />);
  });

  it('It should render 3 divs without errors', () => {
    const wrapper = component.find('div');
    expect(wrapper.length).toBe(3);
  });

  it('It should render 1 form without errors', () => {
    const wrapper = component.find('form');
    expect(wrapper.length).toBe(1);
  });

  it('It should render 2 inputs without errors', () => {
    const wrapper = component.find('input');
    expect(wrapper.length).toBe(2);
  });

  it('It should render 2 buttons without errors', () => {
    const wrapper = component.find('button');
    expect(wrapper.length).toBe(1);
  });

  it('It should render error msg when password is invalid', () => {
    component.setProps({ isValid: false });
    const wrapper = component.find(MsgBox);
    expect(wrapper.length).toBe(1);
  });

  it('It should render error msg when password is valid but get some other error message from backend', () => {
    component.setProps({ isValid: true, isLoginErr: true });
    const wrapper = component.find(MsgBox);
    expect(wrapper.length).toBe(1);
  });
});
