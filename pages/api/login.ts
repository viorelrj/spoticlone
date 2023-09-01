import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import {serialize} from 'cookie'
import { DEFAULT_COOKIE_PARAMS, cookieTokenState } from 'consts/cookies';


const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const baseUri = process.env.NEXT_PUBLIC_BASE_URL;

type Data = {
  name: string
}

function getLoginSearchParams(id: string, state: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('client_id', id);
  searchParams.append('redirect_uri', `${baseUri}/api/login-callback`);
  searchParams.append('response_type', 'code');
  searchParams.append('scope', 'user-read-private user-read-email app-remote-control streaming user-read-playback-state user-modify-playback-state app-remote-control');
  searchParams.append('state', state);

  return searchParams;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const state = uuidv4();
  const params = getLoginSearchParams(clientId as string, state);

  const cookie = serialize(cookieTokenState, state, DEFAULT_COOKIE_PARAMS)

  res.setHeader('Set-Cookie', cookie);
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
}
