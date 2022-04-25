import { TokenContext } from '@spc/contexts/token.context';
import { useContext } from 'react';

export function Index() {
  const { tokenConfig } = useContext(TokenContext);

  return (
    <h1>
      {tokenConfig ? 'Logged in' : 'Not logged in'}
    </h1>
  );
}

export default Index;
