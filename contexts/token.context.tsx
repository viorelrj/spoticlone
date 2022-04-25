import { IChildrenProps } from '@spc/types/base-props';
import { TokenResponseType } from '@spc/types/token';
import {
  createContext, useState,
} from 'react';

export const TokenContext = createContext({
  tokenConfig: {} as TokenResponseType | undefined,
  setTokenConfig: (val: TokenResponseType) => {},
});

export function TokenContextProvider({ children }: IChildrenProps) {
  const [tokenConfig, setTokenConfig] = useState<TokenResponseType>();

  return (
    <TokenContext.Provider value={{ tokenConfig, setTokenConfig }}>
      {children}
    </TokenContext.Provider>
  );
}
