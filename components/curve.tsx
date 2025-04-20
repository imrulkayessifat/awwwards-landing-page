'use client';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { text, curve, translate } from '@/components/lib/anim';

const routes: Record<string, string> = {
    '/': 'Home',
    '/work': 'Work',
    '/about': 'About',
    '/contact': 'Contact',
};

const anim = (variants: Variants) => ({
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
});

type CurveProps = {
    children: React.ReactNode;
    backgroundColor: string;
};

const Curve = ({ children, backgroundColor }: CurveProps) => {
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className="min-h-[calc(100vh)] relative" style={{ backgroundColor }}>
            <div
                className="fixed h-[calc(100vh+600px)] w-screen left-0 top-0 pointer-events-none transition-opacity duration-0 ease-linear delay-100"
                style={{ opacity: dimensions.width === 0 ? 1 : 0, backgroundColor: 'black' }}
            />
            <motion.p
                className="fixed left-1/2 top-[40%] text-white text-[46px] z-[5] -translate-x-1/2 text-center"
                {...anim(text)}
            >
                {routes[pathname]}
            </motion.p>
            {dimensions.width > 0 && <SVG height={dimensions.height} width={dimensions.width} />}
            {children}
        </div>
    );
};

export default Curve;

type SVGProps = {
    height: number;
    width: number;
};

const SVG = ({ height, width }: SVGProps) => {
    const initialPath = `
    M0 300 
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

    const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

    return (
        <motion.svg className="fixed h-[calc(100vh+600px)] w-screen left-0 top-0 pointer-events-none transition-opacity duration-0 ease-linear delay-100" {...anim(translate)}>
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    );
};
