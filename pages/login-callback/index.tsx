import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { consumePkceSession } from '@spc/features/auth/pkce';
import { exchangeCode } from '@spc/features/auth/token';

const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ?? '';

export const LoginCallback = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  // Guards against StrictMode running the effect twice; a code can only be exchanged once.
  const handled = useRef(false);

  useEffect(() => {
    if (!router.isReady || handled.current) return;
    handled.current = true;

    const { code, state } = router.query;
    const session = consumePkceSession();
    if (typeof code !== 'string' || !session || state !== session.state) {
      // Set asynchronously to avoid a synchronous setState inside the effect.
      Promise.resolve().then(() => setError('Spotify login failed.'));
      return;
    }

    exchangeCode(code, session.verifier, redirectUri)
      .then(() => router.replace('/search'))
      .catch(() => setError('Could not complete Spotify login.'));
  }, [router]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link href="/login">Try again</Link>
      </div>
    );
  }

  return (
    <div>
      Logging you in...
    </div>
  );
};

export default LoginCallback;
