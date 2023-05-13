import { IChildrenProps } from '@spc/types/base-props';
import { TokenResponseType } from '@spc/types/token';
import { hashRouteEntries } from '@spc/utils/hash-route-entries/hash-route-entries';
import { useRouter } from 'next/router';
import {
  useEffect, useMemo,
} from 'react';

export var TokenContextProvider = ({ children }: IChildrenProps) => {
  const router = useRouter();

  const routeTokenConfig = useMemo(
    () => hashRouteEntries<TokenResponseType>(router.asPath),
    [router.asPath],
  );

  useEffect(() => {
    if (routeTokenConfig?.access_token) {
      window.token = routeTokenConfig.access_token;
    }
    if (!window.token) router.push('/login');
  }, [routeTokenConfig]);

  return (
    <>
      {children}
    </>
  );
};
