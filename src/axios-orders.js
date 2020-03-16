import axios from 'axios';

const instances = axios.create({
  baseURL: 'https://react-my-burger-85174.firebaseio.com/',
});

export default instances;
