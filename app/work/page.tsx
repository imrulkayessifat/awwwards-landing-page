"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

import Curve from '@/components/curve'
import Rounded from '@/components/rounded'
import Cursor from '@/components/cursor'
import WorkProject from '@/components/work/work-project'

const slideUp = {
    initial: {
        y: 500
    },
    enter: {
        y: 0,
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.5 }
    }
}

const Page = () => {
    const [hasEntered, setHasEntered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        (
            async () => {
                const LocomotiveScroll = (await import('locomotive-scroll')).default
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const locomotiveScroll = new LocomotiveScroll();

                setTimeout(() => {
                    document.body.style.cursor = 'default'
                    window.scrollTo(0, 0);
                }, 1000)
            }
        )()
    }, [])
    return (
        <Curve backgroundColor="#FFFFFF">
            <motion.main
                variants={slideUp}
                initial="initial"
                animate="enter"
                onAnimationComplete={(definition) => {
                    if (definition === 'enter') setHasEntered(true);
                }}
                className='flex flex-col px-[200px] gap-10 w-screen relative' style={{
                    paddingTop: 'calc(clamp(5em,21vh,12em) * 0.33)',
                    paddingBottom: 'calc(clamp(5em,21vh,12em) * 0.66)'
                }}
            >
                <div className='max-w-[1600px]' style={{
                    paddingTop: 'calc(clamp(2.5em,8vh,8em) * 2)',
                }}>
                    <div className='flex flex-wrap relative'>
                        <div className="block w-full order-2 relative" style={{
                            transform: 'translate(0px, 0vh)'
                        }}
                        >
                            <h1 onMouseOver={() => { setIsActive(true) }} onMouseLeave={() => { setIsActive(false) }} className='flex flex-col' style={{
                                fontSize: 'calc(clamp(3.25em, 7vw, 8em) * .875)',
                                lineHeight: 1.065,
                                fontWeight: 450
                            }}>
                                <span>Creating next level </span>
                                <span>digital products</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className='w-[200px]'>
                    <Rounded backgroundColor="rgb(69,92,233)">
                        <p className='relative z-10 transition-colors duration-300 group-hover:text-white'>Development</p>
                    </Rounded>
                </div>
                <WorkProject />
            </motion.main>
            {/* <Contact setIsActive={setIsActive} /> */}
            {
                hasEntered && (
                    <Cursor isActive={isActive} />
                )
            }
        </Curve>
    )
}

export default Page