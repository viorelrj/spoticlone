import { useEffect } from 'react';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

function getLoginSearchParams(id: string, redirect: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('client_id', id);
  searchParams.append('redirect_uri', redirect);
  searchParams.append('response_type', 'token');
  searchParams.append('scope', 'user-read-private user-read-email app-remote-control streaming');

  return searchParams;
}

const login = () => {
  if (!clientId || !redirectUri) return;
  window.location.replace(`https://accounts.spotify.com/authorize?${getLoginSearchParams(clientId, redirectUri)}`);
};

export function LoginForm() {
  useEffect(() => {
    login();
  }, []);

  return (
    <div>Redirecting you</div>
  );
}

export default LoginForm;
