"use client";

import { ReactNode } from "react";

interface PanelProps {
    children: ReactNode;
    id: string;
    className?: string;
}

export default function Panel({ children, id, className = "" }: PanelProps) {
    return (
        <section
            id={id}
            className={`panel relative flex items-center justify-center ${className}`}
        >
            {children}
        </section>
    );
}
