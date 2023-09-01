import {serialize} from 'cookie';
import querystring from 'query-string';
import { NextApiRequest, NextApiResponse } from "next";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const redirecUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {code, state} = req.query;

  const cookieState = req.cookies.sel_state as string;

  if (state !== cookieState) {
    res.status(401).json({
      error: 'hehe'
    });
    return;
  }

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
      redirect_uri: redirecUri,
      grant_type: 'authorization_code'
    })
  };

  const authResponse = await fetch('https://accounts.spotify.com/api/token', authOptions);
  const token = await authResponse.json();

  const cookie = serialize('sel_rt', token.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    // secure: true
  })

  res.setHeader('Set-Cookie', cookie);
  res.redirect('/');
}