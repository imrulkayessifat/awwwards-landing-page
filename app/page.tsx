"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';

import Preloader from '@/components/preloader';
import Landing from '@/components/landing';
import Description from '@/components/description';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import HorizontalSlider from '@/components/horizontal-slider';
import Cursor from '@/components/cursor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
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
        }, 1000)
      }
    )()
  }, [])
  return (
    <main
      className='relative w-full h-full'
    >
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description setIsActive={setIsActive} />
      <Projects />
      <HorizontalSlider />
      <Contact setIsActive={setIsActive} />
      <Cursor isActive={isActive} />
    </main>
  );
}
