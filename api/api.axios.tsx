import axios from 'axios';

export const getSpotifyApiAxiosClient = (token?: string) => axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
