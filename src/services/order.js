import configAxios from '../utils/axios-orders';

const axios = configAxios();

export const purchaseBurgerService = (params) => {
  const { token, ...restparams } = params;
  return axios.post(`/orders.json?auth=${token}`, restparams);
};

export const fetchOrdersService = (params) => {
  const { token, userId } = params;
  return axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);
};
