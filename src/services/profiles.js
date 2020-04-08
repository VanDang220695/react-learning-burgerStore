import configAxios from '../utils/axios-orders';

const axios = configAxios();

// Params: {idToken: ''}

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

export const getProfileUser = () => {
  return axios.get(`/profiles/${userId}.json?auth=${token}`);
};

export const updateProfile = (params) => {
  return axios.put(`/profiles/${userId}.json?auth=${token}`, { ...params, userId });
};
