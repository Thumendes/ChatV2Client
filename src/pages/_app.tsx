import "@fontsource/inter";
import "@fontsource/barlow";
import "../global.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "services/theme";
import UserContextProvider from "context/user";
import ChatContextProvider from "context/chat";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <ChatContextProvider>
          <Component {...pageProps} />
        </ChatContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
