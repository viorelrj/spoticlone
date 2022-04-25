import { ChakraProvider } from '@chakra-ui/react';
import { Player } from '@spc/componvents/player/player.component';
import { PlayerContextProvider } from '@spc/contexts/plyaer/player.provider';
import { TokenContextProvider } from '@spc/contexts/token.context';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import './_app.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <TokenContextProvider>
      <ChakraProvider>
        <PlayerContextProvider>
          <Head>
            <title>Spoticlone</title>
          </Head>
          <main className="app">
            <Component {...pageProps} />
          </main>
          <Player />
          <Script
            src="https://sdk.scdn.co/spotify-player.js"
            strategy="beforeInteractive"
          />
        </PlayerContextProvider>
      </ChakraProvider>
    </TokenContextProvider>
  );
}

export default CustomApp;
