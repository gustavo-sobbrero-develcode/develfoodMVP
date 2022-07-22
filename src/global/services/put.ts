import axios, {AxiosRequestConfig} from 'axios';
import {useState} from 'react';

const api = axios.create({
  baseURL: 'https://develfood-3.herokuapp.com',
});

export const usePut = <T = unknown, TResponse = unknown>(
  url: string,
  body: T,
  options?: AxiosRequestConfig,
) => {
  const [data, setData] = useState<TResponse>({} as TResponse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  async function handlerPut() {
    try {
      setLoading(true);
      const response = await api.put(url, body, options);
      setData(response.data);
    } catch (erro) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return {data, loading, error, handlerPut};
};
