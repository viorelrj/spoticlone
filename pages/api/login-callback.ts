import {serialize} from 'cookie';
import querystring from 'query-string';
import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_COOKIE_PARAMS, cookieRefreshToken } from 'consts/cookies';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const baseUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {code} = req.query;
  // const cookieState = req.cookies[cookieTokenState] as string;

  if (!code) {
    res.redirect('/');
    return;
  }

  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      code,
      redirect_uri: `${baseUri}/api/login-callback`,
      grant_type: 'authorization_code'
    })
  };

  const authResponse = await fetch('https://accounts.spotify.com/api/token', authOptions);
  const token = await authResponse.json();

  const cookie = serialize(cookieRefreshToken, token.refresh_token, DEFAULT_COOKIE_PARAMS)

  res.setHeader('Set-Cookie', cookie);
  res.redirect('/');
}