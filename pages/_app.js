import React from "react";
import { SessionProvider } from "next-auth/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId="738272769394-ar32r2u6pgnl8ejtkrvojh7k6drnfkk8.apps.googleusercontent.com">
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}
