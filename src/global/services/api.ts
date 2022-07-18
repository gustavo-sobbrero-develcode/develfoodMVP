import axios from 'axios';

const api = axios.create({
  baseURL: 'https://develfood-3.herokuapp.com',
});

export default api;
