// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'query-string';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;

type Token = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
}

type Error = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token|Error>,
) {
  const refreshToken = req.cookies.sel_rt;
  
  if (!refreshToken) {
    res.status(401).json({
      error: "nope"
    })
    return;
  }
  
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  };

  const authResponse = await fetch('https://accounts.spotify.com/api/token', options);

  const token = await authResponse.json();

  res.send({
    accessToken: token.access_token,
    tokenType: token.token_type,
    expiresIn: token.expires_in,
    scope: token.scope
  })
}
