import React from "react";
import { SessionProvider } from "next-auth/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}
