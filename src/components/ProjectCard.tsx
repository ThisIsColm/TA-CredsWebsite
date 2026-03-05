"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ProjectCardProps {
    title: string;
    description: string;
    category: string;
    imageBg?: string;
}

export default function ProjectCard({
    title,
    description,
    category,
    imageBg = "#222326",
}: ProjectCardProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className="group flex flex-col gap-3 cursor-pointer"
            whileHover={prefersReducedMotion ? {} : { y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Image container — 4:3 aspect */}
            <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3", borderRadius: "var(--ark-radius)" }}
            >
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: imageBg }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {/* Placeholder — replace with <Image> when assets are ready */}
                    <span
                        className="text-sm uppercase tracking-wider"
                        style={{ color: "var(--ark-text-tertiary)" }}
                    >
                        Project Image
                    </span>
                </motion.div>
            </div>

            {/* Meta */}
            <div className="flex flex-col gap-1">
                <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "var(--ark-text-tertiary)" }}
                >
                    {category}
                </span>
                <h3
                    className="text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-[var(--ark-accent)]"
                    style={{ lineHeight: 1.2, letterSpacing: "-0.02em" }}
                >
                    {title}
                </h3>
                <p
                    className="text-sm"
                    style={{ color: "var(--ark-text-secondary)", lineHeight: 1.6 }}
                >
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
