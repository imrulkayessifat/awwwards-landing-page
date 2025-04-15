import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    {
        title: "Home",
        href: "/",
    },
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

const menuSlide = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
}

const slide = {
    initial: { x: 80 },
    enter: (i: number) => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
    exit: (i: number) => ({ x: 80, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } })
}

const scale = {
    open: { scale: 1, transition: { duration: 0.3 } },
    closed: { scale: 0, transition: { duration: 0.4 } }
}

const Navbar = () => {
    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);

    const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`
    const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`

    const curve = {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    }

    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-screen bg-[#292929] fixed right-0 top-0 text-white z-[3]"
        >
            <div className="box-border h-full p-[100px] flex flex-col justify-between">
                <div onMouseLeave={() => setSelectedIndicator(pathname)} className="flex flex-col text-[56px] gap-[12px] mt-[80px]">
                    <div className="text-[#999999] border-b border-[#999999] uppercase text-[11px] mb-[40px]">
                        <p>Navigation</p>
                    </div>

                    {navItems.map((data, index) => (
                        <motion.div
                            key={index}
                            className="relative flex items-center"
                            onMouseEnter={() => { setSelectedIndicator(data.href) }}
                            custom={index}
                            variants={slide}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                        >
                            <motion.div
                                variants={scale}
                                animate={selectedIndicator == data.href ? "open" : "closed"}
                                className="w-[10px] h-[10px] bg-white rounded-full absolute left-[-30px]">
                            </motion.div>
                            <Link href={data.href}>{data.title}</Link>
                        </motion.div>
                    ))}
                </div>

                <div className="flex w-full justify-between text-[12px] gap-10">
                    <a>Awwwards</a>
                    <a>Instagram</a>
                    <a>Dribble</a>
                    <a>LinkedIn</a>
                </div>
            </div>
            <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-[#292929] stroke-none">
                <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
            </svg>
        </motion.div>
    )
}

export default Navbar