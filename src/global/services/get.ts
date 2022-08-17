import axios, {AxiosRequestConfig} from 'axios';
import {useState} from 'react';
import getApi from './api';

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig,
  useV2Api?: boolean
) {
  const api = getApi(useV2Api);
  
  const [data, setData] = useState<T>({} as T);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  async function fetchData(onSuccess?: (response: T) => void) {
    try {
      setLoading(true);
      const response = await api.get(url, options);
      setData(response.data);
      response.data && onSuccess && onSuccess(response.data);
    } catch (erro) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {data, loading, setLoading, error, fetchData, setData};
}
