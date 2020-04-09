import configAxios from '../utils/axios-orders';

const axios = configAxios();

export const iniIngredientService = () => {
  return axios.get('/ingredients.json');
};
