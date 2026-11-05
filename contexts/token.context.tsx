import { IChildrenProps } from '@spc/types/base-props';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Login routes run without a token.
const AUTH_ROUTES = ['/login', '/login-callback'];

export const TokenContextProvider = ({ children }: IChildrenProps) => {
  const router = useRouter();
  const { isReady, pathname } = router;

  useEffect(() => {
    if (!isReady || AUTH_ROUTES.includes(pathname)) return;

    if (!window.token) router.replace('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, pathname]);

  return (
    <>
      {children}
    </>
  );
};
