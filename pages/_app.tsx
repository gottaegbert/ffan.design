import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';
import './notionblog/notionblog.mudule.scss'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}


export default MyApp;
