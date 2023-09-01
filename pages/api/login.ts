import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import {serialize} from 'cookie'


const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

type Data = {
  name: string
}

function getLoginSearchParams(id: string, redirect: string, state: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('client_id', id);
  searchParams.append('redirect_uri', redirect);
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
  const params = getLoginSearchParams(clientId as string, redirectUri as string, state);


  const cookie = serialize('sel_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    // secure: true
  })

  res.setHeader('Set-Cookie', cookie);
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
}
