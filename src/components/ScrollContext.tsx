"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { MotionValue, useMotionValue } from "framer-motion";

interface ScrollContextValue {
    scrollProgress: number;
    scrollProgressRef: React.RefObject<number>;
    scrollYProgress: MotionValue<number>;
    activePanel: number;
    totalPanels: number;
    setScrollProgress: (v: number) => void;
    setScrollYProgress: (v: MotionValue<number>) => void;
    setActivePanel: (v: number) => void;
    scrollToPanel: (index: number) => void;
    registerScrollToPanel: (fn: (index: number) => void) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
    // scrollProgress is stored in a ref to avoid re-renders on every tick.
    // Components that need the live value can read scrollProgressRef.current.
    const scrollProgressRef = useRef(0);
    const [scrollProgress, _setScrollProgress] = useState(0);
    const [activePanel, setActivePanel] = useState(0);
    const [scrollFn, setScrollFn] = useState<((index: number) => void) | null>(null);
    const defaultMotionValue = useMotionValue(0);
    const [motionValue, setMotionValue] = useState<MotionValue<number>>(defaultMotionValue);

    // Update ref immediately (no re-render); only update state rarely if needed.
    const setScrollProgress = useCallback((v: number) => {
        scrollProgressRef.current = v;
    }, []);

    const registerScrollToPanel = useCallback((fn: (index: number) => void) => {
        setScrollFn(() => fn);
    }, []);

    const scrollToPanel = useCallback(
        (index: number) => {
            if (scrollFn) scrollFn(index);
        },
        [scrollFn]
    );

    const setScrollYProgress = useCallback((v: MotionValue<number>) => {
        setMotionValue(v);
    }, []);

    return (
        <ScrollContext.Provider
            value={{
                scrollProgress,
                scrollProgressRef,
                scrollYProgress: motionValue,
                activePanel,
                totalPanels: 6,
                setScrollProgress,
                setScrollYProgress,
                setActivePanel,
                scrollToPanel,
                registerScrollToPanel,
            }}
        >
            {children}
        </ScrollContext.Provider>
    );
}

export function useScrollContext() {
    const context = useContext(ScrollContext);
    if (!context) throw new Error("useScrollContext must be used within ScrollProvider");
    return context;
}
