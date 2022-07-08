import axios, {AxiosRequestConfig} from 'axios';
import {useState} from 'react';

const api = axios.create({
  baseURL: 'https://gorest.co.in',
});

export const useDelete = <TResponse = unknown>(
  url: string,
  options?: AxiosRequestConfig,
) => {
  const [data, setData] = useState<TResponse>({} as TResponse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  async function handlerDelete() {
    try {
      setLoading(true);
      const response = await api.delete(url, options);
      setData(response.data);
    } catch (erro) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {data, loading, error, handlerDelete};
};
