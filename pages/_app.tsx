import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import { Player } from "@spc/features/player/components/player/player.component";
import { PlayerContextProvider } from "@spc/features/player/context/PlayerProvider";
import { useRefreshToken } from "features/auth/useRefreshToken";
import "./_app.scss";

const manager = createLocalStorageManager("my-key");
const queryClient = new QueryClient();

const CustomApp = ({ Component, pageProps }: AppProps) => {
  useRefreshToken();

  return (
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
  );
};

export default CustomApp;
