import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
});

client.interceptors.request.use(config => {
  const token = window.token || '';
  if (!token) return config;

  config.headers.setAuthorization(`Bearer ${token}`);

  return config;
});

export default client;
