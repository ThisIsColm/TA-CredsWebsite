"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useScrollContext } from "./ScrollContext";
import Logo from "./Logo";

const PANEL_LABELS = ["Hero", "About", "Clients", "Capabilities", "Global", "Contact"];

export default function Header() {
    const { activePanel, scrollToPanel, scrollProgress } = useScrollContext();
    const prefersReducedMotion = useReducedMotion();

    const isLightSlide = activePanel === 1 || activePanel === 3 || activePanel === 4;
    const showBreadcrumbs = activePanel > 0;

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-end px-6 py-4 lg:px-10 pointer-events-none"
            style={{
                backgroundColor: "transparent",
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
                borderBottom: "none",
                height: "72px",
                filter: isLightSlide ? "invert(1)" : "none",
                transition: "filter 0.5s ease",
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Nav breadcrumbs and mobile indicators removed as requested */}
        </motion.header>
    );
}
