import React from 'react'

import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';

import Rounded from '@/components/rounded';

export const slideUp = {
    initial: {
        y: "100%"
    },
    open: (i: number) => ({
        y: "0%",
        transition: { duration: 0.5, delay: 0.01 * i }
    }),
    closed: {
        y: "100%",
        transition: { duration: 0.5 }
    }
}

export const opacity = {
    initial: {
        opacity: 0
    },
    open: {
        opacity: 1,
        transition: { duration: 0.5 }
    },
    closed: {
        opacity: 0,
        transition: { duration: 0.5 }
    }
}

const Description = () => {
    const phrase = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div
            ref={description}
            className="px-[200px] mt-[200px] flex justify-center"
        >
            <div className="max-w-[1400px] flex gap-[50px] relative">
                <p className="m-0 text-[36px] leading-[1.3] flex flex-wrap gap-[8px]">
                    {phrase.split(" ").map((word, index) => (
                        <span
                            key={index}
                            className="relative overflow-hidden inline-flex mr-[3px]"
                        >
                            <motion.span
                                variants={slideUp}
                                custom={index}
                                animate={isInView ? "open" : "closed"}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </p>

                <motion.p
                    variants={opacity}
                    animate={isInView ? "open" : "closed"}
                    className="m-0 text-[18px] font-light w-[80%]"
                >
                    The combination of my passion for design, code & interaction positions
                    me in a unique place in the web design world.
                </motion.p>

                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded backgroundColor="rgb(69,92,233)" className="absolute top-[80%] left-[calc(100%-200px)] w-[180px] h-[180px] bg-[#1C1D20] text-white rounded-[50%] flex items-center justify-center cursor-pointer">
                        <p className="m-0 text-[16px] font-light relative z-[1]">About me</p>
                    </Rounded>
                </div>
            </div>
        </div>

    )
}

export default Description