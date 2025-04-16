import Image from "next/image"
import { Dispatch, SetStateAction, useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';

import Rounded from "@/components/rounded";
import Magnetic from "@/components/magnetic";

interface ContactProps {
    setIsActive: Dispatch<SetStateAction<boolean>>
}

const Contact: React.FC<ContactProps> = ({
    setIsActive
}) => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])

    return (
        <motion.div style={{ y }} ref={container} className="text-white flex flex-col items-center justify-center bg-[#141516] relative">
            <div className="pt-[200px] w-full max-w-[1800px] bg-[#141516]">
                <div className="border-b border-gray-500 pb-[100px] mx-[200px] relative">
                    <span className="flex items-center">
                        <div className="w-[100px] h-[100px] relative rounded-full overflow-hidden">
                            <Image
                                fill
                                alt="image"
                                src="/background.jpg"
                                className="object-cover"
                            />
                        </div>
                        <h2 onMouseOver={() => { setIsActive(true) }} onMouseLeave={() => { setIsActive(false) }} className="ml-[0.3em] text-[5vw] font-light m-0">Let&apos;s work</h2>
                    </span>
                    <h2 onMouseOver={() => { setIsActive(true) }} onMouseLeave={() => { setIsActive(false) }} className="text-[5vw] text-[#ec4e39] font-light m-0">together</h2>

                    <motion.div style={{ x }} className="absolute left-[calc(100%-400px)] top-[calc(100%-75px)]">
                        <Rounded backgroundColor="#334BD3" className="w-[180px] h-[180px] bg-[#455CE9] text-white rounded-full flex items-center justify-center cursor-pointer relative">
                            <p className="m-0 text-[16px] font-light z-10">Get in touch</p>
                        </Rounded>
                    </motion.div>
                    <motion.svg
                        whileHover={{
                            scale: 2.8,
                            transition: { duration: 1 },
                        }}
                        whileTap={{ scale: 2 }}
                        style={{ rotate: rotate, scale: 2.5 }} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[30%] left-full"
                    >
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white" />
                    </motion.svg>
                </div>

                <div className="flex gap-5 mt-[100px] mx-[200px]">
                    <Rounded><p>imrul1052@gmail.com</p></Rounded>
                    <Rounded><p>+880 1736011747</p></Rounded>
                </div>

                <div className="flex justify-between mt-[200px] p-5">
                    <div className="flex gap-2.5 items-end">
                        <span className="flex flex-col gap-[15px]">
                            <h3 className="text-gray-400 cursor-default font-light text-[1em]">Version</h3>
                            <p className="hover:underline-hover">2025 © Edition</p>
                        </span>
                        <span className="flex flex-col gap-[15px]">
                            <h3 className="text-gray-400 cursor-default font-light text-[1em]">Version</h3>
                            <p className="hover:underline-hover">11:49 PM GMT+2</p>
                        </span>
                    </div>
                    <div className="flex gap-2.5 items-end">
                        <span className="flex flex-col gap-[15px]">
                            <h3 className="text-gray-400 cursor-default font-light text-[1em]">socials</h3>
                            <Magnetic><p className="hover:underline-hover">Github</p></Magnetic>
                        </span>
                        <Magnetic><p className="hover:underline-hover">Linkedin</p></Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>

    )
}

export default Contact