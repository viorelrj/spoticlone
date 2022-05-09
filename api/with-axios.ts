import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { selectToken } from 'features/auth/selectors';
import { lensProp, compose, set } from 'ramda';
import { store } from '../store';

const authorizationLens = compose(
  lensProp<AxiosRequestConfig>('headers'),
  lensProp('Authorization'),
);

let currentInstance: AxiosInstance;
let currentToken: string;

export const withAxios = () => {
  const getToken = () => selectToken(store.getState());

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
