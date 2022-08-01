import axios, {AxiosRequestConfig} from 'axios';
import {useState} from 'react';

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

interface Data {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}

export function useCep<TResponse = unknown>(
  endpoint: string,
  options?: AxiosRequestConfig,
) {
  const [data, setData] = useState<Data>({} as Data);
  const [loading, setLoading] = useState(false);

  async function handleCEP(onSuccess?: (response: TResponse) => void) {
    try {
      setLoading(true);
      const response = await api.get(endpoint, options);
      setData(response.data);
      response.data && onSuccess && onSuccess(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return {data, loading, handleCEP};
}
