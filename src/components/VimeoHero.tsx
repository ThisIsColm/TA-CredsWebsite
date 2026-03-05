"use client";

import { motion } from "framer-motion";

interface VimeoHeroProps {
    vimeoId?: string;
}

export default function VimeoHero({
    vimeoId = "1170575694",
}: VimeoHeroProps) {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden z-[10] pointer-events-none">
            {/* Vimeo Background */}
            <div className="absolute inset-0 w-full h-full">
                <iframe
                    src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p`}
                    className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
                    style={{ border: "none" }}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="Hero background video"
                />
            </div>
        </div>
    );
}
