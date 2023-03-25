import { IChildrenProps } from '@spc/types/base-props';
import { TokenResponseType } from '@spc/types/token';
import { hashRouteEntries } from '@spc/utils/hash-route-entries/hash-route-entries';
import { useRouter } from 'next/router';
import {
  createContext, useEffect, useMemo, useState,
} from 'react';

export const TokenContext = createContext({
  tokenConfig: {} as TokenResponseType | null,
  setTokenConfig: (val: TokenResponseType | null) => {},
});

export var TokenContextProvider = ({ children }: IChildrenProps) => {
  const [tokenConfig, setTokenConfig] = useState<TokenResponseType|null>();
  const router = useRouter();

  const routeTokenConfig = useMemo(
    () => hashRouteEntries<TokenResponseType>(router.asPath),
    [router.asPath],
  );

  useEffect(() => {
    if (tokenConfig?.access_token) {
      window.token = tokenConfig.access_token;
      return;
    }
    if (routeTokenConfig?.access_token) {
      setTokenConfig(routeTokenConfig);
      return;
    }
    router.push('/login');
  }, [tokenConfig, routeTokenConfig]);

  const provided = useMemo(() => ({ tokenConfig, setTokenConfig }), [tokenConfig, setTokenConfig]);

  return (
    <TokenContext.Provider value={provided}>
      {children}
    </TokenContext.Provider>
  );
};
