import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';
// import 'react-notion-x/src/styles.css'
import './notionblog/notionblog.mudule.scss'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
  <Analytics />
}

export default MyApp;
