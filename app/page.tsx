"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';

import Preloader from '@/components/preloader';
import Landing from '@/components/landing';
import Description from '@/components/description';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import HorizontalSlider from '@/components/horizontal-slider';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const locomotiveScroll = new LocomotiveScroll();

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default'
          window.scrollTo(0, 0);
        }, 2000)
      }
    )()
  }, [])
  return (
    <main>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      <HorizontalSlider />
      <Contact />
    </main>
  );
}
