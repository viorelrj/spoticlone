import querystring from 'query-string';
import { NextApiRequest, NextApiResponse } from "next";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const redirecUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // queryString.parse(router.asPath.split('#')[1])
  const {code} = req.query;

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

  res.setHeader('Set-Cookie', `sel_rt=${token.refresh_token}; HttpOnly; Path=/; SameSite=Lax; Secure`);

  res.redirect('/');
}