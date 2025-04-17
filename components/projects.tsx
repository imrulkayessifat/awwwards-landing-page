"use client"

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

import Rounded from '@/components/rounded';

interface Project {
    title: string;
    src: string;
    color: string;
    details: string[];
}

const projects: Project[] = [
    {
        title: "Event Management System",
        src: "/bhcc/sign-in.png",
        color: "#000000",
        details: [
            "Designed and developed a fullstack web application to manage club events and member activity.",
            "Implemented RFID-based tracking for member, spouse, and guest check-in/check-out.",
            "Developed role-based access for diplomats, members, family members, and guests.",
            "Enabled dynamic event creation and member assignments with guest eligibility checks.",
            "Built RESTful APIs for real-time entry/exit logging and secure event participation logic."
        ]
    },
    {
        title: "Staff Time Track",
        src: "/staff-time-track/staff-time-track.png",
        color: "#8C8C8C",
        details: [
            "Developed a cross-platform (Windows, macOS, Linux) time tracking desktop app using Electron.",
            "Implemented daily project duration tracking, employee attendance, and total idle time monitoring.",
            "Integrated automatic screenshots, browser URL tracking, and active application usage logging.",
            "Used SQLite to store background service data such as time logs, idle time, and activity tracking for accurate time capture.",
            "Designed a clean and responsive UI with Tailwind CSS, optimized for desktop environments."
        ]
    },
    {
        title: "Photo Optima",
        src: "/locomotive.png",
        color: "#EFE8D3",
        details: ["Designed and developed a fullstack web application to manage club events and member activity."]
    },
    {
        title: "Wellteam",
        src: "/silencio.png",
        color: "#706D63",
        details: ["Designed and developed a fullstack web application to manage club events and member activity."]
    }
]

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
}

const Projects = () => {
    const [modal, setModal] = useState<{ active: boolean; index: number }>({ active: false, index: 0 });
    const [detailsModal, setDetailsModal] = useState<{ active: boolean; index: number }>({ active: false, index: 0 });
    const { active, index } = modal;
    const { active: detailsactive, index: detailsindex } = detailsModal;
    const modalContainer = useRef<HTMLDivElement | null>(null);
    const detailsContainer = useRef<HTMLDivElement | null>(null);
    const cursor = useRef<HTMLDivElement | null>(null);
    const cursorLabel = useRef<HTMLDivElement | null>(null);

    const xMoveContainer = useRef<(v: number) => void>(() => { });
    const yMoveContainer = useRef<(v: number) => void>(() => { });
    const xMoveCursor = useRef<(v: number) => void>(() => { });
    const yMoveCursor = useRef<(v: number) => void>(() => { });
    const xMoveCursorLabel = useRef<(v: number) => void>(() => { });
    const yMoveCursorLabel = useRef<(v: number) => void>(() => { });

    useEffect(() => {
        //Move Container
        xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
        yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })
        //Move cursor
        xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" })
        yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" })
        //Move cursor label
        xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" })
        yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" })
    }, [])

    const moveItems = (x: number, y: number) => {
        xMoveContainer.current(x)
        yMoveContainer.current(y)
        xMoveCursor.current(x)
        yMoveCursor.current(y)
        xMoveCursorLabel.current(x)
        yMoveCursorLabel.current(y)
    }
    const manageModal = (active: boolean, index: number, x: number, y: number) => {
        moveItems(x, y)
        setModal({ active, index })
    }
    const manageDetails = (active: boolean, index: number, x: number, y: number) => {
        moveItems(x, y)
        setDetailsModal({ active, index })
    }
    return (
        <main onMouseMove={(e) => { moveItems(e.clientX, e.clientY) }} className="flex bg-[#FFF5E3] pb-10 flex-col items-center px-[200px]">
            <div className="max-w-[1400px] w-full flex flex-col items-center justify-center mb-[100px]">
                {
                    projects.map((project, index) => {
                        return (
                            <div className="flex w-full justify-between items-center px-[100px] py-[50px] border-t border-[#c9c9c9] cursor-pointer transition-all duration-200 last:border-b hover:opacity-50 group" key={index}>
                                <h2 className="text-[50px] m-0 font-normal transition-all duration-400 group-hover:-translate-x-[10px]" onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }} onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }}>{project.title}</h2>
                                <p className="font-light transition-all duration-400 group-hover:translate-x-[10px]" onMouseEnter={(e) => { manageDetails(true, index, e.clientX, e.clientY) }} onMouseLeave={(e) => { manageDetails(false, index, e.clientX, e.clientY) }}>Description</p>
                            </div>
                        )
                    })
                }
            </div>
            <Rounded backgroundColor="rgb(69,92,233)">
                <p className='relative z-10 transition-colors duration-300 group-hover:text-white'>More work</p>
            </Rounded>
            <>
                <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className="fixed bg-transparent top-1/2 left-1/2 h-[800px] w-[850px] overflow-hidden pointer-events-none z-[3]">
                    <div style={{ top: index * -100 + "%" }} className="relative w-full h-full transition-[top] duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)]">
                        {
                            projects.map((project, index) => {
                                const { src } = project
                                return <div className="flex items-center justify-center w-full h-full" style={{ backgroundColor: "transparent" }} key={`modal_${index}`}>
                                    <Image
                                        src={`${src}`}
                                        width={600}
                                        height={0}
                                        alt="image"
                                    />
                                </div>
                            })
                        }
                    </div>
                </motion.div>
                <motion.div ref={cursor} className="fixed z-[3] flex items-center justify-center w-[80px] h-[80px] rounded-full bg-[#455CE9] text-white text-[14px] font-light pointer-events-none" variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
                <motion.div ref={cursorLabel} className="fixed z-[3] flex items-center justify-center w-[80px] h-[80px] rounded-full text-white text-[14px] font-light pointer-events-none" variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
            </>
            <>
                <motion.div ref={detailsContainer} variants={scaleAnimation} initial="initial" animate={detailsactive ? "enter" : "closed"} className="fixed rounded-md top-1/2 left-1/2 h-[500px] w-[550px] overflow-hidden pointer-events-none z-[3]">
                    <div style={{ top: detailsindex * -100 + "%" }} className="relative w-full h-full transition-[top] duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)]">
                        {
                            projects.map((project, index) => {
                                const { details } = project
                                return <div
                                    className="flex justify-center w-full pl-7 h-full bg-[#e6e0d1]"
                                    key={`modal_${index}`}>
                                    <ul className='flex flex-col justify-around list-disc'>
                                        {
                                            details.map((detail, key) => (

                                                <li key={key}>
                                                    {detail}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            })
                        }
                    </div>
                </motion.div>
            </>
        </main>
    )
}

export default Projects