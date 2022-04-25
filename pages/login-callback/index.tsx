import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { hashRouteEntries } from '@spc/utils/hash-route-entries/hash-route-entries';
import { TokenResponseType } from '@spc/types/token';
import { TokenContext } from '@spc/contexts/token.context';

export function LoginCallback() {
  const router = useRouter();
  const { setTokenConfig } = useContext(TokenContext);

  useEffect(() => {
    setTokenConfig(hashRouteEntries<TokenResponseType>(router.asPath));
    router.push('/search');
  }, [router, setTokenConfig]);

  return (
    <div>
      Logging you in...
    </div>
  );
}

export default LoginCallback;
