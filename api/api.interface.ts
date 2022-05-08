import { AxiosResponse } from 'axios';

export type ISearchType = 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode';
export type ISearchResultType = 'albums' | 'artists' | 'playlists' | 'tracks' | 'shows' | 'episodes';

interface IAlbumImage {
  height: number;
  width: number;
  url: string;
}

export interface ITrack {
  album: {
    images: IAlbumImage[];
    name: string;
  },
  artists: {
    id:string;
    name: string;
  }[],
  href: string,
  id: string,
  name: string;
  uri: string
}

export interface ISearchResultItem {
  href: string;
  items: ITrack[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export type ISearchResult = {
  [key in ISearchResultType]: ISearchResultItem;
}

export type ISearchGetter = (
  query: string,
  type?: ISearchType[],
  limit?: number,
  offset?: number
) => Promise<AxiosResponse<ISearchResult>>;

export interface IDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

export interface IAvailableDevices {
  devices: IDevice[];
}
export type IAvaiablesDeviceGetter = () => Promise<AxiosResponse<IAvailableDevices>>;

export type IPlaybackTransferSetter = (deviceId: string, play: boolean) => Promise<AxiosResponse>;
export type IPlaybackPlaySetter = (contextUri: string) => Promise<AxiosResponse>;

export interface ISpotifyApi {
  search: ISearchGetter;
  getAvailableDevices: IAvaiablesDeviceGetter;
  transferPlayback: IPlaybackTransferSetter;
  setPlaying: IPlaybackPlaySetter;
}
