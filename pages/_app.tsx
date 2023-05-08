import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { motion } from 'framer-motion';
import type { Session } from "next-auth";
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ChatBubble from '@/components/ChatBubble';


// Configure NProgress
NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

// Add event listeners to handle route changes
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsLoading(true));
    Router.events.on('routeChangeComplete', () => setIsLoading(false));
    Router.events.on('routeChangeError', () => setIsLoading(false));

    setIsLoading(false);

    return () => {
      Router.events.off('routeChangeStart', () => setIsLoading(true));
      Router.events.off('routeChangeComplete', () => setIsLoading(false));
      Router.events.off('routeChangeError', () => setIsLoading(false));
    };
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.h2
          className="text-white text-4xl mb-4"
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          Loading
        </motion.h2>
        <motion.div
          className="flex space-x-2"
          animate={{ x: [-20, 0, 20, 0, -20] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{ y: [0, -20, 0, 20, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{ y: [0, -20, 0, 20, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{ y: [0, -20, 0, 20, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
          />
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{ y: [0, -20, 0, 20, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.6 }}
          />
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{ y: [0, -20, 0, 20, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.8 }}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <SessionProvider session={session}>
      <Head>
        {/* Meta tags for SEO */}
        <title>ChatBots</title>

      </Head>
      <main>
      <Component {...pageProps} />
      <ChatBubble />
      <Analytics />
      </main>
    </SessionProvider>
  );
}