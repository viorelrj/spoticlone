import { TokenContext } from '@spc/contexts/token.context';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export function Index() {
  const { tokenConfig } = useContext(TokenContext);
  const router = useRouter();

  useEffect(() => {
    if (!tokenConfig) {
      router.push('/login');
      return;
    }
    router.push('search');
  }, [router, tokenConfig]);

  return (
    <h1>
      {tokenConfig ? 'Logged in' : 'Not logged in'}
    </h1>
  );
}

export default Index;
