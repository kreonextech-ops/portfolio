"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const stats = [
    { value: "150+", label: "Systems Deployed" },
    { value: "40+", label: "AI Integrations" },
    { value: "99.9%", label: "Uptime Guaranteed" },
    { value: "10x", label: "Faster Workflows" },
];

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <motion.span
            ref={ref}
            className="inline-block"
            initial={{ opacity: 0, y: 40, rotateX: -20 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
            {word}&nbsp;
        </motion.span>
    );
}

export default function AuthoritySection() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

    const headline = "We don't build websites. We engineer the digital infrastructure of tomorrow.".split(" ");

    return (
        <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
            {/* Background glow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-700/8 blur-[100px]" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Main statement */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />
                            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Our Philosophy</span>
                        </motion.div>

                        <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold leading-tight mb-8">
                            {headline.map((word, i) => (
                                <AnimatedWord key={i} word={word} delay={0.05 * i} />
                            ))}
                        </h2>

                        <motion.div
                            className="w-full h-px bg-white/5 mb-8 overflow-hidden"
                            initial={{ scaleX: 0 }}
                            animate={inView ? { scaleX: 1 } : {}}
                            transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                            style={{ transformOrigin: "left" }}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
                                style={{ width: lineWidth }}
                            />
                        </motion.div>

                        <motion.p
                            className="text-white/50 text-lg leading-relaxed font-light"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            Every system we build is a living, breathing organism — interconnected, intelligent, and built to evolve.
                            From AI-powered CRMs to automated ERP pipelines and native mobile applications, we create the technical backbone
                            that transforms businesses into autonomous digital enterprises.
                        </motion.p>
                    </div>

                    {/* Right: Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="glass border border-white/8 rounded-2xl p-6 relative overflow-hidden group hover-target"
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ scale: 1.04, borderColor: "rgba(139,92,246,0.3)" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="font-display text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                                <div className="text-white/40 text-sm font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
