import { ChakraProvider } from '@chakra-ui/react';
import { Player } from '@spc/componvents/organisms/player/player.component';
import { PlayerContextProvider } from '@spc/contexts/player/player.provider';
import { TokenContextProvider } from '@spc/contexts/token.context';
import { SpotifyApiWrapper } from 'api/api.wrapper';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import './_app.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default CustomApp;
