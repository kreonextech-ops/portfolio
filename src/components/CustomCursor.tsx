"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [trailing, setTrailing] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let rafId: number;
        let tx = -100, ty = -100;

        const onMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            const isInteractive = !!(
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".hover-target") ||
                target.closest("input") ||
                target.getAttribute("role") === "button"
            );
            setIsHovered(isInteractive);
        };

        const animate = () => {
            setTrailing(prev => ({
                x: prev.x + (pos.x - prev.x) * 0.12,
                y: prev.y + (pos.y - prev.y) * 0.12,
            }));
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);

        const onDown = () => setIsClicking(true);
        const onUp = () => setIsClicking(false);
        const onLeave = () => setIsVisible(false);
        const onEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        document.documentElement.addEventListener("mouseleave", onLeave);
        document.documentElement.addEventListener("mouseenter", onEnter);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            document.documentElement.removeEventListener("mouseenter", onEnter);
        };
    }, [pos.x, pos.y, isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Dot cursor */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                        style={{
                            width: isClicking ? 6 : 8,
                            height: isClicking ? 6 : 8,
                            background: "radial-gradient(circle, #8b5cf6, #3b82f6)",
                            x: pos.x - 4,
                            y: pos.y - 4,
                            boxShadow: "0 0 10px rgba(139,92,246,0.8)",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: isClicking ? 0.7 : 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.1 }}
                    />
                    {/* Ring cursor */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border"
                        style={{
                            width: isHovered ? 50 : 36,
                            height: isHovered ? 50 : 36,
                            borderColor: isHovered ? "rgba(139,92,246,0.8)" : "rgba(139,92,246,0.4)",
                            x: trailing.x - (isHovered ? 25 : 18),
                            y: trailing.y - (isHovered ? 25 : 18),
                            backdropFilter: isHovered ? "blur(2px)" : "none",
                            background: isHovered ? "rgba(139,92,246,0.05)" : "transparent",
                            boxShadow: isHovered ? "0 0 20px rgba(139,92,246,0.3)" : "none",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: isClicking ? 0.85 : 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}
