import configAxios from '../utils/axios-orders';
import { API_KEY } from '../constants';

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
export const getInfoUserService = (params) => {
  return axios.post(`accounts:update?key=${API_KEY}`, params);
};
