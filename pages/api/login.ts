// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import queryString from 'query-string';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

type Data = {
  name: string
}

const generateRandomString = () => 'asdfjkhasdfkljhasdflkjh'

function getLoginSearchParams(id: string, redirect: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('client_id', id);
  searchParams.append('redirect_uri', redirect);
  searchParams.append('response_type', 'code');
  searchParams.append('scope', 'user-read-private user-read-email app-remote-control streaming user-read-playback-state user-modify-playback-state app-remote-control');
  searchParams.append('state', generateRandomString(16));

  return searchParams;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const params = getLoginSearchParams(clientId as string, redirectUri as string);
  
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
}
