import configAxios from '../utils/axios-orders';

const axios = configAxios();

// Params: {idToken: ''}

export const getProfileUser = ({ token, userId }) => {
  return axios.get(`/profiles/${userId}.json?auth=${token}`);
};

export const updateProfile = (params) => {
  const { token, userId, ...restparams } = params;
  return axios.put(`/profiles/${userId}.json?auth=${token}`, { ...restparams });
};
