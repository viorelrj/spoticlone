import axios, { AxiosRequestConfig } from 'axios';

declare global {
  interface Window { token: string }
}

const tokenInterceptor = (config: AxiosRequestConfig) => {
  const token = window.token || '';
  if (!token) return config;

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
};

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
});

client.interceptors.request.use(tokenInterceptor);

export default client;
