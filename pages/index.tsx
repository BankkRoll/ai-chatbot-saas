import { About } from "@/components/main/About";
import { LearnMore } from "@/components/main/LearnMore";
import { Pricing } from "@/components/main/Pricing";
import { useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Navbar from '@/components/NavBar';
import 'nprogress/nprogress.css';

export default function Home() {

  return (
    <>
    <LazyMotion features={domAnimation}>
    <m.main
        className="min-h-screen bg-gradient-to-br from-violet-400 via-blue-400 to-cyan-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      <Navbar />
      <About />
      <LearnMore />
      <Pricing />
      </m.main>
      </LazyMotion>
    </>
  );
}
