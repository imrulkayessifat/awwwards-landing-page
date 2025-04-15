'use client'

import React, { ReactNode, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Magnetic from '@/components/magnetic'

interface RoundedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    backgroundColor?: string
}

const Rounded: React.FC<RoundedButtonProps> = ({
    children,
    backgroundColor,
    ...attributes
}) => {
    const circle = useRef<HTMLDivElement | null>(null)
    const timeline = useRef<gsap.core.Timeline | null>(null)
    const timeoutId = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true })
        timeline.current
            .to(circle.current, {
                top: '-25%',
                width: '150%',
                duration: 0.4,
                ease: 'power3.in',
            }, 'enter')
            .to(circle.current, {
                top: '-150%',
                width: '125%',
                duration: 0.25,
            }, 'exit')
    }, [])

    const manageMouseEnter = () => {
        if (timeoutId.current) clearTimeout(timeoutId.current)
        timeline.current?.tweenFromTo('enter', 'exit')
    }

    const manageMouseLeave = () => {
        timeoutId.current = setTimeout(() => {
            timeline.current?.play()
        }, 300)
    }

    return (
        <Magnetic>
            <div
                className="relative flex items-center justify-center overflow-hidden rounded-full border border-gray-500 px-[60px] py-[15px] cursor-pointer group"
                style={{ overflow: 'hidden' }}
                onMouseEnter={manageMouseEnter}
                onMouseLeave={manageMouseLeave}
                {...attributes}
            >
                {/* <p className="relative z-10 transition-colors duration-300 group-hover:text-white"> */}
                    {children}
                {/* </p> */}
                <div
                    ref={circle}
                    style={{ backgroundColor }}
                    className="absolute top-full w-full h-[150%] rounded-[50%]"
                ></div>
            </div>
        </Magnetic>
    )
}

export default Rounded
