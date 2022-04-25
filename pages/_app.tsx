import { ChakraProvider } from '@chakra-ui/react';
import { TokenContextProvider } from '@spc/contexts/token-context';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './_app.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <TokenContextProvider>
      <Head>
        <title>Spoticlone</title>
      </Head>
      <main className="app">
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </TokenContextProvider>
  );
}

export default CustomApp;
