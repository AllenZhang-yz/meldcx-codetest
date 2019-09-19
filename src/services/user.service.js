import axios from '../const/axios';

const login = loginData => {
  return axios.post('/login', loginData);
};

const getDevices = () => {
  return axios.get('/devices');
};

const notify = (header, data) => {
  return axios.post('/notify', header, data);
};

export const userService = {
  login,
  getDevices,
  notify,
};
