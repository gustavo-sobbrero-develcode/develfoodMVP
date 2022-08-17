import axios, { AxiosInstance } from 'axios';

const getApi = (useV2Api?: boolean): AxiosInstance => {
  return axios.create({
    baseURL: !useV2Api ? 'https://develfood-3.herokuapp.com' : 'novaUrl',
  });
}

export default getApi;
