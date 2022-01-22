import { Button } from '@chakra-ui/react';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

const login = () => {
  window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=user-read-private%20user-read-email`);
};

export function LoginForm() {
  return (
    <div>
      <Button onClick={login}>Log in</Button>
    </div>
  );
}

export default LoginForm;
