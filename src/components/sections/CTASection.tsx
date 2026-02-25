"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function CTASection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const bigWords = ["Let's Build", "Something", "Extraordinary."];

    return (
        <section
            id="contact"
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
        >
            {/* Ambient blobs — use CSS vars so they're visible but not dark in light mode */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] animate-float-slow"
                style={{ background: "var(--glow-purple)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] animate-float-slow"
                style={{ background: "var(--glow-blue)", animationDelay: "2s" }} />

            {/* Mouse-reactive spotlight */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.08), transparent 70%)`,
                }}
            />

            {/* Light trail particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-purple-500/40"
                    style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 30}%` }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}

            <div className="relative z-10 text-center max-w-5xl mx-auto">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong border border-purple-500/40 mb-12"
                    style={{ boxShadow: "0 0 40px rgba(139,92,246,0.2)" }}
                >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300 tracking-wide">Ready to transform your business?</span>
                </motion.div>

                {/* Big headline */}
                <div className="mb-10">
                    {bigWords.map((word, i) => (
                        <motion.div
                            key={word}
                            className="overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <motion.h2
                                className="font-display text-[clamp(40px,7vw,90px)] font-bold leading-[1.0] tracking-tight"
                                initial={{ y: 80 }}
                                animate={inView ? { y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {i === 0 ? (
                                    <span className="text-white">{word}</span>
                                ) : i === 1 ? (
                                    <span className="gradient-text">{word}</span>
                                ) : (
                                    <span className="text-white">{word}</span>
                                )}
                            </motion.h2>
                        </motion.div>
                    ))}
                </div>

                {/* Sub copy */}
                <motion.p
                    className="text-white/40 text-xl leading-relaxed max-w-2xl mx-auto mb-16 font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Partner with us to engineer your complete digital infrastructure — CRM, ERP, mobile apps, AI automation, and everything in between. Built to scale. Designed to impress.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-wrap gap-4 justify-center items-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <a
                        href="https://www.kreonex.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-target group relative px-10 py-5 rounded-2xl text-white font-semibold tracking-wide overflow-hidden transition-all duration-300 hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                            boxShadow: "0 0 40px rgba(139,92,246,0.4), 0 20px 40px rgba(0,0,0,0.4)",
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Start Your Project
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <a
                        href="#capabilities"
                        className="hover-target px-10 py-5 rounded-2xl glass border border-white/10 font-medium tracking-wide hover:border-purple-500/40 transition-all duration-300"
                        style={{ color: "var(--muted)" }}
                    >
                        View All Services
                    </a>
                </motion.div>

                {/* Bottom strip */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-8 text-sm"
                    style={{ color: "var(--muted)" }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    {["No lock-in contracts", "48h project kickoff", "Dedicated AI engineer", "Full IP ownership"].map((item, i) => (
                        <div key={item} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                            <span>{item}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
