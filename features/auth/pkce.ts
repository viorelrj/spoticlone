const VERIFIER_KEY = 'spc.pkce.verifier';
const STATE_KEY = 'spc.pkce.state';
const SCOPES = 'user-read-private user-read-email app-remote-control streaming user-read-playback-state user-modify-playback-state';

const base64Url = (bytes: Uint8Array) => btoa(String.fromCharCode(...Array.from(bytes)))
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');

const randomString = () => base64Url(crypto.getRandomValues(new Uint8Array(32)));

export const startLogin = async (clientId: string, redirectUri: string) => {
  const verifier = randomString();
  const state = randomString();
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));

  sessionStorage.setItem(VERIFIER_KEY, verifier);
  sessionStorage.setItem(STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: base64Url(new Uint8Array(digest)),
    state,
    scope: SCOPES,
  });
  window.location.replace(`https://accounts.spotify.com/authorize?${params}`);
};

// Read once and remove, so a verifier is never reused.
export const consumePkceSession = () => {
  const verifier = sessionStorage.getItem(VERIFIER_KEY);
  const state = sessionStorage.getItem(STATE_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);
  sessionStorage.removeItem(STATE_KEY);
  return verifier && state ? { verifier, state } : null;
};
