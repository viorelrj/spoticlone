import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react';
import { Player } from '@spc/features/player/components/player/player.component';

import { TokenContextProvider } from '@spc/contexts/token.context';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PlayerContextProvider } from '@spc/features/player/context/PlayerProvider';
import { store } from '../store';
import './_app.scss';

const manager = createLocalStorageManager('my-key');

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    {/* <PlayerScript /> */}
    <TokenContextProvider>
      <ChakraProvider colorModeManager={manager}>
        <Head>
          <title>Spoticlone</title>
        </Head>
        <PlayerContextProvider>
          <main className="main">
            <Component {...pageProps} />
          </main>
          <Player />
        </PlayerContextProvider>
      </ChakraProvider>
    </TokenContextProvider>
  </Provider>
);

export default CustomApp;
