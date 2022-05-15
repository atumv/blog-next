import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/styles/global.css';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.png" />
      <title>Blog</title>
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </div>
);

export default MyApp;
