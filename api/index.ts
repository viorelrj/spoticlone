import axiosInstance from './api.axios';
import { getSpotifyApiClient } from './api.client';

const spotifyApiClient = getSpotifyApiClient(axiosInstance);
export default spotifyApiClient;
