import { IChildrenProps } from '@spc/types/base-props';
import { useRouter } from 'next/router';
import {
  useEffect, useMemo,
} from 'react';
import queryString from 'query-string';

export const TokenContextProvider = ({ children }: IChildrenProps) => {
  const router = useRouter();

  const routeTokenConfig = useMemo(
    () => queryString.parse(router.asPath.split('#')[1]),
    [router],
  );

  useEffect(() => {
    if (routeTokenConfig?.access_token) {
      window.token = routeTokenConfig.access_token as string;
    }
    if (!window.token) router.push('/login');
  }, [router]);

  return (
    <>
      {children}
    </>
  );
};
