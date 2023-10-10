import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';
import StickyCursor from '../components/StickyCursor';
import { useRef } from "react";


function MyApp({ Component, pageProps }: AppProps) {
  const stickyElement = useRef(null);

  return (
    <>
      <Component {...pageProps} />
        <StickyCursor />
      <Analytics />
    </>
  );
}


export default MyApp;
