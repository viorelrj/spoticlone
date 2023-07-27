import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { lensProp, compose, set } from 'ramda';

const authorizationLens = compose(
  lensProp<AxiosRequestConfig>('headers'),
  lensProp('Authorization'),
);

let currentInstance: AxiosInstance;
let currentToken: string;

declare global {
  interface Window { token: string; }
}

export const withAxios = () => {
  const getToken = () => window.token || '';

  const preToken = getToken();
  if (!!preToken && preToken === currentToken) return currentInstance;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
  });

  instance.interceptors.request.use(
    (config) => {
      const tok = getToken() || '';
      return set<AxiosRequestConfig, string>(authorizationLens, `Bearer ${tok}`, config);
    },
  );

  currentInstance = instance;
  return instance;
};
