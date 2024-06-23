// api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// Generic request function
export const request = async <T>(
  method: AxiosRequestConfig['method'],
  url: string,
  data: any = null,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const response: AxiosResponse<T> = await api({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
};

export default api;
