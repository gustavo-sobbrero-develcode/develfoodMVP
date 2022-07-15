import axios from 'axios';

const api = axios.create({
  baseURL: 'https://0859-179-235-88-84.ngrok.io',
});

export default api;
