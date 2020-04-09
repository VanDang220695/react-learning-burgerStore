import configAxios from '../utils/axios-orders';

const API_KEY = 'AIzaSyC1JYOQTBx7_t3ozgiT8ILbMEHQRL8Qgzw';
const axios = configAxios(true);

export const signupService = (params) => {
  return axios.post(`accounts:signUp?key=${API_KEY}`, params);
};

export const signinService = (params) => {
  return axios.post(`accounts:signInWithPassword?key=${API_KEY}`, params);
};

export const sendEmailConfirmService = (params) => {
  return axios.post(`accounts:sendOobCode?key=${API_KEY}`, params);
};
export const getInforUserService = (params) => {
  return axios.post(`accounts:update?key=${API_KEY}`, params);
};
