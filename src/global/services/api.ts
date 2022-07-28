import axios from 'axios';

const api = axios.create({
  baseURL: 'https://1292-164-163-142-68.ngrok.io',
});

export default api;
