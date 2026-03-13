"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

/*
 * Pin positions calculated from real lat/long on an equirectangular projection.
 * The SVG viewBox is 1280x640, mapping -180°→+180° longitude and +90°→-90° latitude.
 *
 * Formula:
 *   x% = (longitude + 180) / 360 * 100
 *   y% = (90 - latitude) / 180 * 100
 */
const LOCATIONS: { x: number; y: number; city: string; country: string; highlight?: boolean }[] = [
    // ── North America ──
    // Los Angeles: 34.05°N, 118.24°W
    { x: 16.16, y: 31.08, city: "Los Angeles", country: "USA" },
    // San Francisco: 37.77°N, 122.42°W
    { x: 15.00, y: 29.02, city: "San Francisco", country: "USA" },
    // Chicago: 41.88°N, 87.63°W
    { x: 25.66, y: 26.73, city: "Chicago", country: "USA" },
    // New York: 40.71°N, 74.01°W
    { x: 29.44, y: 27.38, city: "New York", country: "USA" },
    // Austin: 30.27°N, 97.74°W
    { x: 22.85, y: 33.18, city: "Austin", country: "USA" },
    // Vancouver: 49.28°N, 123.12°W
    { x: 15.80, y: 22.62, city: "Vancouver", country: "Canada" },
    // Toronto: 43.65°N, 79.38°W
    { x: 27.95, y: 25.75, city: "Toronto", country: "Canada" },
    // Mexico City: 19.43°N, 99.13°W
    { x: 22.46, y: 39.21, city: "Mexico City", country: "Mexico" },

    // ── South America ──
    // São Paulo: 23.55°S, 46.63°W
    { x: 35.05, y: 63.08, city: "São Paulo", country: "Brazil" },
    // Bogotá: 4.71°N, 74.07°W
    { x: 29.43, y: 47.38, city: "Bogotá", country: "Colombia" },
    // Buenos Aires: 34.60°S, 58.38°W
    { x: 32.78, y: 69.22, city: "Buenos Aires", country: "Argentina" },

    // ── Europe ──
    // Dublin: 53.35°N, 6.26°W
    { x: 48.26, y: 20.36, city: "Dublin", country: "Ireland", highlight: true },
    // London: 51.51°N, 0.13°W
    { x: 49.96, y: 21.38, city: "London", country: "UK" },
    // Amsterdam: 52.37°N, 4.90°E
    { x: 51.36, y: 20.91, city: "Amsterdam", country: "Netherlands" },
    // Paris: 48.86°N, 2.35°E
    { x: 50.65, y: 22.86, city: "Paris", country: "France" },
    // Berlin: 52.52°N, 13.41°E
    { x: 53.72, y: 20.82, city: "Berlin", country: "Germany" },
    // Barcelona: 41.39°N, 2.17°E
    { x: 50.60, y: 27.01, city: "Barcelona", country: "Spain" },
    // Milan: 45.46°N, 9.19°E
    { x: 52.55, y: 24.74, city: "Milan", country: "Italy" },
    // Prague: 50.08°N, 14.42°E
    { x: 54.00, y: 22.18, city: "Prague", country: "Czech Republic" },
    // Copenhagen: 55.68°N, 12.57°E
    { x: 53.49, y: 19.07, city: "Copenhagen", country: "Denmark" },

    // ── Middle East / Africa ──
    // Dubai: 25.20°N, 55.27°E
    { x: 65.35, y: 36.00, city: "Dubai", country: "UAE" },
    // Cape Town: 33.92°S, 18.42°E
    { x: 57.12, y: 65.84, city: "Cape Town", country: "South Africa" },

    // ── Asia ──
    // Mumbai: 19.08°N, 72.88°E
    { x: 74.24, y: 42.40, city: "Mumbai", country: "India" },
    // Bangkok: 13.76°N, 100.50°E
    { x: 78.92, y: 42.36, city: "Bangkok", country: "Thailand" },
    // Singapore: 1.35°N, 103.82°E
    { x: 80.84, y: 49.25, city: "Singapore", country: "Singapore" },
    // Hong Kong: 22.32°N, 114.17°E
    { x: 81.71, y: 37.60, city: "Hong Kong", country: "China" },
    // Tokyo: 35.68°N, 139.69°E
    { x: 88.80, y: 30.18, city: "Tokyo", country: "Japan" },
    // Seoul: 37.57°N, 126.98°E
    { x: 85.27, y: 29.13, city: "Seoul", country: "South Korea" },

    // ── Oceania ──
    // Sydney: 33.87°S, 151.21°E
    { x: 92.00, y: 68.82, city: "Sydney", country: "Australia" },
    // Melbourne: 37.81°S, 144.96°E
    { x: 90.27, y: 71.01, city: "Melbourne", country: "Australia" },
];

/* 
 * Use these to tweak the overall "constellation" of pins all at once.
 * Adjusting these will move/scale all pins relative to the background map.
 */
const MAP_ADJUSTMENTS = {
    xOffset: -8,   // Move all pins: positive = Right, negative = Left
    yOffset: -14,   // Move all pins: positive = Down, negative = Up
    xScale: 1.05,  // Scale horizontally: >1 expands, <1 compresses
    yScale: 1.4,  // Scale vertically: >1 expands, <1 compresses
};

export default function WorldMap() {
    const [hoveredPin, setHoveredPin] = useState<number | null>(null);
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className="container-wide h-full flex flex-col px-0 pt-[72px] pb-16 lg:py-24 select-none justify-between mx-auto">
            {/* Header section (replaces top headline to match breadcrumbs) */}
            <div className="w-full shrink-0">
                <motion.span
                    className="text-xs font-mono uppercase tracking-[0.2em] block"
                    style={{ color: "var(--ark-accent)" }}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    Global reach
                </motion.span>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 lg:mb-12 mt-4"
                    style={{ color: "#111", letterSpacing: "-0.02em" }}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                >
                    Wherever you are, we got you.
                </motion.h2>
            </div>

            {/* Map Container — capped height prevents overflow on tall screens */}
            <div className="relative w-full max-w-6xl mx-auto flex-1 min-h-0 flex items-center justify-center mt-auto mb-auto" style={{ maxHeight: '60vh' }}>
                {/* 
                  * Wrap the map and pins in a strict 2:1 aspect ratio box.
                  * Capping the width ensures the height won't overflow shorter displays.
                  */}
                <div
                    className="relative w-full aspect-[2/1]"
                    style={{ maxWidth: 'min(100%, 120vh)' }}
                >
                    {/* SVG World Map from file */}
                    <img
                        src="/306338.svg"
                        alt="World Map"
                        className="absolute inset-0 w-full h-full"
                        style={{ opacity: 0.18, filter: "saturate(0)" }}
                        draggable={false}
                    />

                    {/* Pin Markers (positioned absolutely over the map image) */}
                    {LOCATIONS.map((loc, i) => (
                        <motion.div
                            key={`${loc.city}-${i}`}
                            className="absolute"
                            style={{
                                left: `${(loc.x * MAP_ADJUSTMENTS.xScale) + MAP_ADJUSTMENTS.xOffset}%`,
                                top: `${(loc.y * MAP_ADJUSTMENTS.yScale) + MAP_ADJUSTMENTS.yOffset}%`,
                                transform: "translate(-50%, -100%)",
                                zIndex: hoveredPin === i ? 50 : 10,
                            }}
                            initial={
                                prefersReducedMotion
                                    ? { opacity: 1 }
                                    : { opacity: 0, scale: 0, y: -30 }
                            }
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.3 + i * 0.06,
                                ease: [0.34, 1.56, 0.64, 1],
                                scale: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                    delay: 0.3 + i * 0.06,
                                },
                            }}
                            onMouseEnter={() => setHoveredPin(i)}
                            onMouseLeave={() => setHoveredPin(null)}
                        >
                            {/* Pulse ring */}
                            <motion.div
                                className="absolute rounded-full"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    left: "50%",
                                    bottom: "0px",
                                    transform: "translateX(-50%)",
                                    backgroundColor: loc.highlight
                                        ? "rgba(232, 93, 4, 0.15)"
                                        : "rgba(232, 93, 4, 0.08)",
                                }}
                                animate={{
                                    scale: [1, 2.5, 1],
                                    opacity: [0.6, 0, 0.6],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Pin SVG */}
                            <svg
                                width={loc.highlight ? "22" : "16"}
                                height={loc.highlight ? "30" : "22"}
                                viewBox="0 0 24 32"
                                fill="none"
                                className="cursor-pointer drop-shadow-sm"
                                style={{
                                    filter:
                                        hoveredPin === i
                                            ? "drop-shadow(0 2px 8px rgba(232,93,4, 0.4))"
                                            : "none",
                                    transition: "filter 0.2s ease, transform 0.2s ease",
                                    transform: hoveredPin === i ? "scale(1.3)" : "scale(1)",
                                }}
                            >
                                <path
                                    d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20C24 5.37 18.63 0 12 0z"
                                    fill="#E85D04"
                                    fillOpacity={loc.highlight ? 1 : 0.85}
                                />
                                <circle cx="12" cy="11" r="4" fill="white" fillOpacity="0.9" />
                            </svg>

                            {/* Tooltip */}
                            {hoveredPin === i && (
                                <motion.div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-50 pointer-events-none"
                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg"
                                        style={{
                                            backgroundColor: "#1a1a1a",
                                            color: "white",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        <span className="text-[#E85D04] mr-1">●</span>
                                        {loc.city}
                                        <span className="text-white/50 ml-1">{loc.country}</span>
                                    </div>
                                    {/* Tooltip arrow */}
                                    <div
                                        className="w-2 h-2 mx-auto -mt-1 rotate-45"
                                        style={{ backgroundColor: "#1a1a1a" }}
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom tagline */}
            <motion.p
                className="text-lg lg:text-2xl font-medium text-center mt-8 lg:mt-12 tracking-tight shrink-0"
                style={{ color: "#333" }}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
                We&apos;ve shot{" "}
                <span className="italic" style={{ color: "#E85D04" }}>
                    across the globe
                </span>{" "}
                for world-leading brands.
            </motion.p>
        </div>
    );
}
