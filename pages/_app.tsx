import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { TokenContextProvider } from '@spc/contexts/token.context';
import { PlayerContextProvider } from '@spc/features/player/context/PlayerProvider';
import { Player } from '@spc/features/player/components/player/player.component';
import { store } from '../store';
import './_app.scss';

const manager = createLocalStorageManager('my-key');
const queryClient = new QueryClient();

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <TokenContextProvider>
      <ChakraProvider colorModeManager={manager}>
        <Head>
          <title>Spoticlone</title>
        </Head>
        <PlayerContextProvider>
          <QueryClientProvider client={queryClient}>
            <main className="main">
              <Component {...pageProps} />
            </main>
            <Player />
          </QueryClientProvider>
        </PlayerContextProvider>
      </ChakraProvider>
    </TokenContextProvider>
  </Provider>
);

export default CustomApp;
