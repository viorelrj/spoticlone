import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { hashRouteEntries } from '@spc/utils/hash-route-entries/hash-route-entries';
import { TokenResponseType } from '@spc/types/token';
import { TokenContext } from '@spc/contexts/token.context';
import { useDispatch } from 'react-redux';
import { setToken } from 'features/auth';

export function LoginCallback() {
  const router = useRouter();
  const { setTokenConfig } = useContext(TokenContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = hashRouteEntries<TokenResponseType>(router.asPath);
    setTokenConfig(token);
    dispatch(setToken(token.access_token));
    router.push('/search');
  }, [router, setTokenConfig, dispatch]);

  return (
    <div>
      Logging you in...
    </div>
  );
}

export default LoginCallback;
