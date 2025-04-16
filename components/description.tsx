import React, { Dispatch, SetStateAction, useEffect } from 'react'

import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

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

interface DescriptionProps {
    setIsActive: Dispatch<SetStateAction<boolean>>
}

const Description: React.FC<DescriptionProps> = ({
    setIsActive
}) => {
    const phrase = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
    const description = useRef(null);
    const isInView = useInView(description)
    const refs = useRef<(HTMLSpanElement | null)[]>([]);
    const body = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        createAnimation();
    }, [])

    const createAnimation = () => {
        gsap.to(refs.current, {
            scrollTrigger: {
                trigger: description.current,
                scrub: true,
                start: `top-=500`,
                end: `+=${400}`,
            },
            opacity: 1,
            ease: "none",
            stagger: 0.1
        })
    }

    const splitWords = (phrase: string) => {
        return phrase.split(' ').map((word, i) => {
            const letters = splitLetters(word, i);
            return <p key={word + '_' + i}>{letters}</p>;
        });
    };

    const splitLetters = (word: string, index: number) => {
        return word.split('').map((letter, i) => (
            <span
                className="opacity-[0.2]"
                key={letter + '_' + index + '_' + i}
                ref={(el) => {
                    if (el) refs.current.push(el);
                }}
            >
                {letter}
            </span>
        ));
    };
    return (
        <div
            ref={description}
            className="px-[200px] py-[200px] flex justify-center bg-[#FFFDF9]"
        >
            <div className="max-w-[1400px] flex gap-[50px] relative">
                <div ref={body} onMouseOver={() => { setIsActive(true) }} onMouseLeave={() => { setIsActive(false) }} className="m-0 text-[36px]  leading-[1.3] flex flex-wrap gap-[8px]">
                    {/* {phrase.split(" ").map((word, index) => (
                        <span
                            key={index}
                            className="relative overflow-hidden inline-flex mr-[3px] "
                        >
                            <motion.span
                                variants={slideUp}
                                custom={index}
                                animate={isInView ? "open" : "closed"}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))} */}
                    {
                        splitWords(phrase)
                    }
                </div>

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