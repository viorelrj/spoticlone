import { useEffect, useRef, useState } from "react";
import { startLogin } from "@spc/features/auth/pkce";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

export const LoginForm = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const configError =
    !clientId || !redirectUri ? "Spotify client is not configured" : null;
  const error = configError ?? loginError;
  // Guards against StrictMode running the effect twice.
  const started = useRef(false);

  useEffect(() => {
    if (started.current || !clientId || !redirectUri) return;
    started.current = true;
    startLogin(clientId, redirectUri).catch(() =>
      setLoginError("Could not start Spotify login"),
    );
  }, []);

  return <div>{error ?? "Redirecting you"}</div>;
};

export default LoginForm;
