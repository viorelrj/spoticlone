import { ChakraProvider } from '@chakra-ui/react';
import { Player } from '@spc/componvents/organisms/player/player.component';
import { PlayerContextProvider } from '@spc/contexts/player/player.provider';
import { TokenContextProvider } from '@spc/contexts/token.context';
import { SpotifyApiWrapper } from 'api/api.wrapper';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Provider } from 'react-redux';
import { store } from '../store';
import './_app.scss';

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <TokenContextProvider>
      <ChakraProvider>
        <SpotifyApiWrapper>
          <PlayerContextProvider>
            <Head>
              <title>Spoticlone</title>
            </Head>
            <main className="main">
              <Component {...pageProps} />
            </main>
            <Player className="player" />
            <Script
              src="https://sdk.scdn.co/spotify-player.js"
              strategy="beforeInteractive"
            />
          </PlayerContextProvider>
        </SpotifyApiWrapper>
      </ChakraProvider>
    </TokenContextProvider>
  </Provider>
);

export default CustomApp;
