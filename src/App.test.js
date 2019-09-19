import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Login from './components/Login';
import Devices from './components/Devices';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  it('It should render Login without errors for the initial router', () => {
    expect(wrapper.find(Login).length).toBe(1);
    expect(wrapper.find(Devices).length).toBe(0);
  });
});
