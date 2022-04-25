import axios, { AxiosError } from 'axios';

const unauthorizedInterceptor = (callback?: () => any) => (error: AxiosError) => {
  if (error.response?.status !== 401) return error;
  return callback?.();
};

export const getSpotifyApiAxiosClient = (token?: string, refreshCallback?: () => any) => {
  const tok = token || '';

  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
    headers: {
      Authorization: `Bearer ${tok}`,
    },
  });

  client.interceptors.response.use((res) => res, unauthorizedInterceptor(refreshCallback));

  return client;
};
