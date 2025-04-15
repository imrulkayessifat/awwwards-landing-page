import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';

const slider1 = [
    {
        color: "#613d3d",
        src: "/staff-time-track/sign-in.png"
    },
    {
        color: "#2a212b",
        src: "/staff-time-track/home-page-min.png"
    },
    {
        color: "#212b23",
        src: "/staff-time-track/home-page-max.png"
    },
    {
        color: "#21242b",
        src: "/staff-time-track/staff-time-track.png"
    }
]

const slider2 = [
    {
        color: "#d4e3ec",
        src: "/maven.jpg"
    },
    {
        color: "#e5e0e1",
        src: "/panda.jpg"
    },
    {
        color: "#d7d4cf",
        src: "/powell.jpg"
    },
    {
        color: "#e1dad6",
        src: "/wix.jpg"
    }
]

const HorizontalSlider = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])
    return (
        <div ref={container} className="flex flex-col gap-[3vw] relative mt-[200px] bg-white z-[1]">
            <motion.div style={{ x: x1 }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
                {
                    slider1.map((project, index) => {
                        return <div key={index} className="w-1/4 h-[20vw] flex items-center justify-center" style={{ backgroundColor: project.color }}>
                            <div className="relative w-4/5 h-4/5">
                                <Image
                                    fill={true}
                                    alt={"image"}
                                    src={`${project.src}`}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    })
                }
            </motion.div>
            <motion.div style={{ x: x2 }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
                {
                    slider2.map((project, index) => {
                        return <div key={index} className="w-1/4 h-[20vw] flex items-center justify-center" style={{ backgroundColor: project.color }}>
                            <div key={index} className="relative w-4/5 h-4/5">
                                <Image
                                    fill={true}
                                    alt={"image"}
                                    src={`${project.src}`}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    })
                }
            </motion.div>
            <motion.div style={{ height }} className="relative mt-[100px] bg-red-500">
                <div className="h-[1550%] w-[120%] left-[-10%] rounded-b-[50%] bg-white z-[1] absolute shadow-[0px_60px_50px_rgba(0,0,0,0.748)]"></div>
            </motion.div>
        </div>

    )
}

export default HorizontalSlider