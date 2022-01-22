import { TokenResponseType } from '@spc/types/token';
import { createContext, FC, ReactNode, useState } from 'react';

export const TokenContext = createContext({
  tokenConfig: {} as TokenResponseType | undefined,
  setTokenConfig: (val: TokenResponseType) => {},
});

export const TokenContextProvider:FC<{children: ReactNode}> = ({children}) => {
  const [tokenConfig, setTokenConfig] = useState<TokenResponseType>();

  return (
    <TokenContext.Provider value={{ tokenConfig, setTokenConfig }}>
      {children}
    </TokenContext.Provider>
  );
}
