"use client";

import { motion } from "framer-motion";

export default function Logo() {
    return (
        <motion.div
            className="fixed left-0 top-1/2 -translate-y-1/2 z-[12] pointer-events-none select-none"
            initial={{ opacity: 0, x: -40, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="container-wide">
                <div className="grid-layout">
                    <div className="col-span-12">
                        <img
                            src="/Tiny_Ark_Logo_White.png"
                            alt="Tiny Ark"
                            className="w-full max-w-[300px] md:max-w-[500px] lg:max-w-[800px] h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
