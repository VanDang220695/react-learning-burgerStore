import axios from 'axios';

const configAxios = (isAuth = false) => {
  let baseURL = 'https://react-my-burger-85174.firebaseio.com/';
  if (isAuth) {
    baseURL = 'https://identitytoolkit.googleapis.com/v1/';
  }
  const instances = axios.create({
    baseURL,
  });
  return instances;
};

export default configAxios;
