import { useEffect, useRef, useState } from 'react';
import { startLogin } from '@spc/features/auth/pkce';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  // Guards against StrictMode running the effect twice.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (!clientId || !redirectUri) {
      setError('Spotify client is not configured');
      return;
    }
    startLogin(clientId, redirectUri).catch(() => setError('Could not start Spotify login'));
  }, []);

  return (
    <div>{error ?? 'Redirecting you'}</div>
  );
};

export default LoginForm;
