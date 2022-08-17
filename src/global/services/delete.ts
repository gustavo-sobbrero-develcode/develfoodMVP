import axios, {AxiosRequestConfig} from 'axios';
import {useState} from 'react';
import getApi from './api';

export const useDelete = <TResponse = unknown>(
  url: string,
  options?: AxiosRequestConfig,
  useV2Api?: boolean
) => {
  const api = getApi(useV2Api);
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
