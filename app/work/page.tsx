"use client"

import React, { useEffect } from 'react'
import { motion } from 'framer-motion';

import Curve from '@/components/curve'
import Rounded from '@/components/rounded'
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
                animate="enter" className='flex flex-col mx-[200px] gap-10' style={{
                    paddingTop: 'calc(clamp(5em,21vh,12em) * 0.33)',
                    paddingBottom: 'calc(clamp(5em,21vh,12em) * 0.66)'
                }}>
                <div className='max-w-[1600px]' style={{
                    paddingTop: 'calc(clamp(2.5em,8vh,8em) * 2)',
                }}>
                    <div className='flex flex-wrap relative'>
                        <div className="block w-full order-2 relative" style={{
                            transform: 'translate(0px, 0vh)'
                        }}
                        >
                            <h1 className='flex flex-col' style={{
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
        </Curve>
    )
}

export default Page