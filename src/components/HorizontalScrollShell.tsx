"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollContext } from "./ScrollContext";

interface HorizontalScrollShellProps {
    children: React.ReactNode;
}

export default function HorizontalScrollShell({
    children,
}: HorizontalScrollShellProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { setScrollProgress, setActivePanel, totalPanels, registerScrollToPanel } =
        useScrollContext();
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Use Framer Motion for scroll-driven transforms
    // Memoize options to prevent infinite render loops
    const scrollOptions = useMemo(() => ({
        target: isMobile ? undefined : targetRef,
        offset: ["start start", "end end"] as any,
    }), [isMobile]);

    const { scrollYProgress } = useScroll(scrollOptions);

    // Calculate the horizontal translate
    // 6 panels = 0vw to -500vw (since each panel is exactly 100vw)
    const xTranslate = useTransform(
        scrollYProgress,
        [0, 1],
        ["0vw", `-${(totalPanels - 1) * 100}vw`],
        { clamp: true }
    );

    // Update context progress and active panel — optimized to minimize re-renders.
    // scrollProgress is written to a ref (no re-render).
    // activePanel state only updates when the computed panel index changes.
    const lastPanelRef = useRef(0);
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setScrollProgress(latest);

            const panelSize = 1 / (totalPanels - 1);
            const panelIndex = Math.max(0, Math.min(
                Math.floor((latest + panelSize * 0.3) / panelSize),
                totalPanels - 1
            ));

            // Only trigger a React re-render when the panel actually changes
            if (panelIndex !== lastPanelRef.current) {
                lastPanelRef.current = panelIndex;
                setActivePanel(panelIndex);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, setScrollProgress, setActivePanel, totalPanels]);

    // Lenis initialization — used only for smooth programmatic scrollTo animations.
    // Wheel events are handled discretely by the custom handler below.
    const lenisRef = useRef<Lenis | null>(null);
    useEffect(() => {
        const lenis = new Lenis({
            orientation: "vertical",
            smoothWheel: true,    // Lenis must manage scroll pipeline for scrollTo to work
            wheelMultiplier: 0,   // Zero out wheel input — discrete handler takes over
            touchMultiplier: 1.5,
        });
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Snap function - now accepts an optional onComplete callback
    const scrollToPanel = useCallback((index: number, onComplete?: () => void) => {
        if (!lenisRef.current) return;

        const options = {
            duration: 0.8,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard expo out
            onComplete: () => {
                if (onComplete) onComplete();
            }
        };

        if (isMobile) {
            lenisRef.current.scrollTo(index * window.innerHeight, options);
        } else {
            const targetHeight = targetRef.current?.offsetHeight || 0;
            const windowHeight = window.innerHeight;
            const scrollableDist = targetHeight - windowHeight;
            const targetPos = (index / (totalPanels - 1)) * scrollableDist;

            lenisRef.current.scrollTo(targetPos, options);
        }
    }, [isMobile, totalPanels]);

    // Register scrollToPanel for Header/Dots
    useEffect(() => {
        registerScrollToPanel(scrollToPanel);
    }, [registerScrollToPanel, scrollToPanel]);

    // Keyboard navigation — precise panel-by-panel movement
    const isScrollingRef = useRef(false);
    const targetPanelRef = useRef(0);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrollingRef.current) return;

            // Calculate current panel from scroll progress
            // Math.floor with a small offset ensures we detect the "current" panel correctly even at the very start of a slide
            const progress = scrollYProgress.get();
            const currentPanel = Math.floor(progress * (totalPanels - 1) + 0.05);

            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                const nextPanel = Math.min(currentPanel + 1, totalPanels - 1);
                if (nextPanel > currentPanel || progress < (nextPanel / (totalPanels - 1))) {
                    isScrollingRef.current = true;
                    targetPanelRef.current = nextPanel;
                    scrollToPanel(nextPanel, () => {
                        setTimeout(() => {
                            isScrollingRef.current = false;
                            targetPanelRef.current = lastPanelRef.current;
                        }, 150);
                    });
                }
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                const prevPanel = Math.max(currentPanel - 1, 0);
                // If we are slightly past a panel start, first arrow left should go to the start of the current panel
                const targetPanel = progress > (currentPanel / (totalPanels - 1)) + 0.02 ? currentPanel : prevPanel;

                isScrollingRef.current = true;
                targetPanelRef.current = targetPanel;
                scrollToPanel(targetPanel, () => {
                    setTimeout(() => {
                        isScrollingRef.current = false;
                        targetPanelRef.current = lastPanelRef.current;
                    }, 150);
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [scrollYProgress, totalPanels, scrollToPanel]);

    // Wheel-driven slide navigation — one slide per intentional gesture.
    // Uses targetPanelRef to track the "intended" destination and isScrollingRef to lock inputs.
    useEffect(() => {
        const container = targetRef.current;
        if (!container || isMobile) return;

        // Sync targetPanelRef with current panel on mount/resize
        targetPanelRef.current = lastPanelRef.current;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (isScrollingRef.current) return;

            // Determine primary scroll axis
            const absX = Math.abs(e.deltaX);
            const absY = Math.abs(e.deltaY);
            // Use whichever delta is stronger to support both vertical wheel and horizontal trackpad swipes
            const delta = absX > absY ? e.deltaX : e.deltaY;

            // Threshold to ignore trackpad noise/tiny movements
            if (Math.abs(delta) < 20) return;

            const current = targetPanelRef.current;
            const next = delta > 0
                ? Math.min(current + 1, totalPanels - 1)
                : Math.max(current - 1, 0);

            if (next === current) return;

            isScrollingRef.current = true;
            targetPanelRef.current = next;

            scrollToPanel(next, () => {
                // Buffer after animation to let momentum settle
                setTimeout(() => {
                    isScrollingRef.current = false;
                    // Ensure our internal tracker is synced with where we actually landed
                    targetPanelRef.current = lastPanelRef.current;
                }, 150);
            });
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [isMobile, totalPanels, scrollToPanel]);

    if (isMobile) {
        return (
            <div className="flex flex-col w-full">
                {children}
            </div>
        );
    }

    // Height = (panels - 1) * scrollVhPerPanel + 100vh for viewport.
    // Using 80vh per panel transition gives a snappy, tight scroll.
    const scrollVhPerPanel = 80;
    const containerHeight = (totalPanels - 1) * scrollVhPerPanel + 100;

    return (
        <div ref={targetRef} className="relative" style={{ height: `${containerHeight}vh` }}>
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
                <motion.div
                    style={{ x: xTranslate }}
                    className="flex flex-row w-fit h-full will-change-transform"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
