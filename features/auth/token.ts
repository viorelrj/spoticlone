import { TokenResponseType } from '@spc/types/token';

// Access token lives on window.token; refresh token and expiry are in memory only.
// Uses fetch rather than the axios client so its interceptors don't recurse.

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '';

let refreshToken: string | null = null;
let expiresAt = 0;
let refreshing: Promise<string> | null = null;

const requestToken = async (body: Record<string, string>) => {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, ...body }),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status}`);

  const data: TokenResponseType = await res.json();
  window.token = data.access_token;
  refreshToken = data.refresh_token ?? refreshToken;
  expiresAt = Date.now() + data.expires_in * 1000;
  return data.access_token;
};

export const exchangeCode = (code: string, verifier: string, redirectUri: string) => requestToken({
  grant_type: 'authorization_code',
  code,
  redirect_uri: redirectUri,
  code_verifier: verifier,
});

export const refreshAccessToken = () => {
  if (!refreshToken) return Promise.reject(new Error('No refresh token'));
  if (!refreshing) {
    refreshing = requestToken({ grant_type: 'refresh_token', refresh_token: refreshToken })
      .finally(() => { refreshing = null; });
  }
  return refreshing;
};

// Current token, refreshed first if it expires within a minute.
export const getToken = async () => {
  if (window.token && refreshToken && Date.now() > expiresAt - 60_000) return refreshAccessToken();
  return window.token || '';
};

export const clearSession = () => {
  window.token = '';
  refreshToken = null;
  expiresAt = 0;
};
