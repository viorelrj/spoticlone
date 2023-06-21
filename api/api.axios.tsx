import axios from 'axios';

const tokenInterceptor = (config: any) => {
  const token = window.token || '';
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
});

client.interceptors.request.use(tokenInterceptor);

export default client;
