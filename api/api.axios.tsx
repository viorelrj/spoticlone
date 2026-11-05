import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { clearSession, getToken, refreshAccessToken } from '@spc/features/auth/token';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
});

client.interceptors.request.use(async (config) => {
  const token = await getToken().catch(() => window.token);
  if (token) config.headers.setAuthorization(`Bearer ${token}`);
  return config;
});

// On a 401, refresh once and retry; if refresh fails, send the user back to login.
client.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as (InternalAxiosRequestConfig & { retried?: boolean }) | undefined;
  if (error.response?.status !== 401 || !config || config.retried) return Promise.reject(error);
  config.retried = true;

  try {
    await refreshAccessToken();
  } catch {
    clearSession();
    window.location.assign('/login');
    return Promise.reject(error);
  }
  return client(config);
});

export default client;
