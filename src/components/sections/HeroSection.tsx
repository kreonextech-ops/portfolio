"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, Zap, Brain, Globe, Cpu } from "lucide-react";
import dynamic from "next/dynamic";

const R3FScene = dynamic(() => import("@/components/R3FScene"), { ssr: false });

// Floating tags anchored to the LEFT and RIGHT sides — never overlapping the center headline
const leftTags = [
    { label: "AI Systems", icon: Brain, delay: 0.2, top: "35%" },
    { label: "Automation", icon: Zap, delay: 0.5, top: "55%" },
];
const rightTags = [
    { label: "SaaS Platforms", icon: Globe, delay: 0.3, top: "30%" },
    { label: "Enterprise AI", icon: Cpu, delay: 0.6, top: "52%" },
];

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);
    const y = useTransform(scrollY, [0, 600], [0, 120]);
    const scale = useTransform(scrollY, [0, 600], [1, 0.92]);

    // Mouse state for R3F camera rig
    const [mouse3D, setMouse3D] = useState({ x: 0, y: 0 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;   // -1 to 1
        const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;  // -1 to 1
        setMouse3D({ x: nx, y: ny });
        mouseX.set(nx * 6);
        mouseY.set(ny * 6);
    }, [mouseX, mouseY]);

    const words = ["Intelligent", "Autonomous", "Adaptive"];
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((i: number) => (i + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden section-blend"
        >
            {/* Ambient gradient background — uses CSS vars so it looks good in both themes */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-glow"
                    style={{ background: "var(--glow-purple)" }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-glow"
                    style={{ background: "var(--glow-blue)", animationDelay: "1s" }} />
                <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full blur-[100px]"
                    style={{ background: "var(--glow-purple)", opacity: 0.4 }} />
            </div>

            {/* Grid lines */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* R3F 3D Interactive Canvas */}
            <div className="absolute inset-0 z-[1]">
                <R3FScene mouseX={mouse3D.x} mouseY={mouse3D.y} />
            </div>

            {/* ── LEFT SIDE TAGS ── fixed to left edge, vertically centered */}
            <div className="absolute left-6 xl:left-10 top-0 h-full hidden lg:flex flex-col justify-center gap-5 z-20">
                {leftTags.map((tag) => (
                    <motion.div
                        key={tag.label}
                        className="glass border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2.5 whitespace-nowrap hover:border-purple-500/40 transition-colors"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + tag.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        animate-float
                    >
                        <tag.icon className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{tag.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* ── RIGHT SIDE TAGS ── fixed to right edge, vertically centered */}
            <div className="absolute right-6 xl:right-10 top-0 h-full hidden lg:flex flex-col justify-center gap-5 z-20">
                {rightTags.map((tag) => (
                    <motion.div
                        key={tag.label}
                        className="glass border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2.5 whitespace-nowrap hover:border-blue-500/40 transition-colors"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + tag.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <tag.icon className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{tag.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Hero Content — pt-20 pushes it below the fixed navbar */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20"
                style={{ opacity, y, scale }}
            >
                {/* Eyebrow badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">AI Engineering Studio</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: "0.5s" }} />
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    className="font-display text-[clamp(44px,7vw,88px)] font-bold leading-[1.05] tracking-tight mb-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-white">We Build</span>
                    <br />
                    <span className="relative inline-block min-w-[260px]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={wordIndex}
                                className="gradient-text"
                                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: "inline-block" }}
                            >
                                {words[wordIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <br />
                    <span className="text-white/80">Digital Ecosystems</span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    className="text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light"
                    style={{ color: "var(--muted)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    From intelligent CRM &amp; ERP systems to custom mobile apps and AI automation pipelines —
                    we engineer complete digital infrastructure that thinks, adapts, and scales.
                </motion.p>

                {/* CTA Row */}
                <motion.div
                    className="flex flex-wrap gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                >
                    <a
                        href="#capabilities"
                        className="hover-target group relative px-8 py-4 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-glow-purple hover:scale-105"
                    >
                        <span className="relative z-10">Explore Capabilities</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                        href="https://www.kreonex.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-target px-8 py-4 rounded-2xl glass border border-white/10 font-medium text-sm tracking-wide hover:border-purple-500/50 transition-all duration-300"
                        style={{ color: "var(--muted)" }}
                    >
                        Start a Project →
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-purple-500/60 to-transparent"
                />
                <ArrowDown className="w-4 h-4 text-purple-500/60" />
            </motion.div>
        </section>
    );
}
