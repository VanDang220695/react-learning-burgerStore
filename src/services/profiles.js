import configAxios from '../utils/axios-orders';

const axios = configAxios();

// Params: {idToken: ''}

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

export const getProfileUser = () => {
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  return axios.get(`/profiles.json${queryParams}`);
};

export const updateProfile = (params) => {
  return axios.post(`/profiles.json?auth=${token}`, { ...params, userId });
};
