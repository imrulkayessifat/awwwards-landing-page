"use client"

import React from 'react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/navbar';
import Rounded from '@/components/rounded';
import Magnetic from '@/components/magnetic';
import Link from 'next/link';

const navItems = [
    {
        title: "Work",
        href: "/work",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Contact",
        href: "/contact",
    },
]

const Header = () => {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);

    useEffect(() => {
        if (isActive) setIsActive(false)
    }, [isActive])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out", onComplete: () => setIsActive(false) }) }
            }
        })
    }, [])
    const isDynamicRoute = (pathname: string) => {
        const staticPaths = ['/work', '/about', '/contact'];
        const basePath = '/' + pathname.split('/')[1]; // e.g. '/work' from '/work/event'

        return staticPaths.includes(basePath) && pathname !== basePath;
    };
    console.log(pathname)
    return (
        <>
            <div
                ref={header}
                className={`absolute top-0 z-[1] w-full p-9 flex justify-between items-center ${(pathname === '/work' || pathname === '/about' || isDynamicRoute(pathname)) ? 'text-black' : 'text-white'} font-light`}
            >
                <Magnetic>
                    <Link href="/">
                        <div className="flex cursor-pointer">
                            <p className="m-0 transition-all duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)]">©</p>
                            <div className="flex relative overflow-hidden whitespace-nowrap ml-1 transition-all duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)] group">
                                <p className="relative transition-transform duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[-100%]">Code by</p>
                                <p className="relative pl-[0.3em] transition-transform duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[-65px]">Imrul</p>
                                <p className="absolute left-[120px] pl-[0.3em] transition-transform duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[-80px]">Kayes</p>
                            </div>
                        </div>
                    </Link>
                </Magnetic>

                <div className="flex items-center space-x-4">
                    {navItems.map((data, key) => (
                        <Magnetic key={key}>
                            <div className="flex flex-col relative z-[1] p-4 cursor-pointer group">
                                <Link className="cursor-pointer" href={data.href}>
                                    {data.title}
                                </Link>
                                <div className={`absolute w-[5px] h-[5px] top-[45px] left-1/2 ${(pathname === '/work' || pathname === '/about' || isDynamicRoute(pathname)) ? 'bg-black' : 'bg-white'} rounded-full transform -translate-x-1/2 scale-0 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100`} />
                            </div>
                        </Magnetic>
                    ))}
                </div>
            </div>

            <div
                ref={button}
                className="fixed right-0 z-[4] scale-0"
            >
                <Rounded
                    onClick={() => setIsActive(!isActive)}
                    backgroundColor="rgb(69,92,233)"
                    className="m-5 w-20 h-20 rounded-full bg-[#1C1D20] border border-white/15 flex items-center justify-center cursor-pointer relative"
                >
                    <div
                        className={`relative w-full z-[1] before:content-[''] after:content-[''] before:block after:block before:h-[1px] after:h-[1px] before:w-[40%] after:w-[40%] before:bg-white after:bg-white before:mx-auto after:mx-auto before:relative after:relative before:transition-transform after:transition-transform
         after:top-[-5px] before:top-[5px] before:duration-[0.3s] after:[duration-[0.3s]] ${isActive ? 'before:rotate-[-45deg] after:rotate-[45deg] before:top-0 after:top-[-1px]' : ''}`}
                    />
                </Rounded>
            </div>

            <AnimatePresence mode="wait">{isActive && <Navbar />}</AnimatePresence>
        </>

    )
}

export default Header