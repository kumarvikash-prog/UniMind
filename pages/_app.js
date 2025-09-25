import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import axios from "axios";

// Configure axios to include credentials with all requests
axios.defaults.withCredentials = true;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
