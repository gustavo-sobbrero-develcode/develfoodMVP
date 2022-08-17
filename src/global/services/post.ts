import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {useState} from 'react';
import getApi from './api';

export const usePost = <T = unknown, TResponse = unknown>(
  url: string,
  options?: AxiosRequestConfig,
  useV2Api?: boolean
) => {
  const api = getApi(useV2Api);
  const [data, setData] = useState<TResponse>({} as TResponse);
  const [loading, setLoading] = useState(false);

  async function handlerPost(
    body: T,
    onError: (error: AxiosError<any, any>) => void,
    onSuccess?: (response: TResponse) => void,
  ) {
    try {
      setLoading(true);
      const response = await api.post(url, body, options);
      setData(response.data);
      response.data && onSuccess && onSuccess(response.data);
    } catch (error: AxiosError<any, any> | any) {
      error && onError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {data, loading, handlerPost};
};
