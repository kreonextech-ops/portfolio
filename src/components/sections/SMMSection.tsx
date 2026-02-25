"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Megaphone,
    Bot,
    Sparkles,
    Leaf,
    MessageSquare,
    ImageIcon,
    Video,
    Zap,
    TrendingUp,
    ArrowRight,
} from "lucide-react";

const pillars = [
    {
        title: "Organic Content",
        icon: Leaf,
        color: "#10b981",
        description:
            "Strategic reach without paid ads. We build content engines that drive engagement and discoverability organically — no ad spend needed.",
        highlights: [
            { icon: Megaphone, label: "Platform-native strategies" },
            { icon: TrendingUp, label: "Growth without ad budget" },
            { icon: MessageSquare, label: "Community-first engagement" },
        ],
    },
    {
        title: "AI Automation",
        icon: Bot,
        color: "#8b5cf6",
        description:
            "Auto-comments, smart replies, and DM triggers powered by Agentic AI. Your social presence stays active 24/7 while you focus on building.",
        highlights: [
            { icon: MessageSquare, label: "Auto-comments & replies" },
            { icon: Zap, label: "DM triggers & sequences" },
            { icon: Bot, label: "Agentic AI engine" },
        ],
    },
    {
        title: "AI Creative Lab",
        icon: Sparkles,
        color: "#ec4899",
        description:
            "AI-optimised posts, high-fidelity AI product photography, and video generation. Studio-quality creative at a fraction of the time and cost.",
        highlights: [
            { icon: ImageIcon, label: "AI product photography" },
            { icon: Video, label: "Auto video generation" },
            { icon: Sparkles, label: "AI-optimised copy" },
        ],
    },
];

export default function SMMSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            {/* Ambient glow */}
            <div
                className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px]"
                style={{ background: "var(--glow-purple)" }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-blue)" }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                        <span className="text-xs font-medium text-pink-300 tracking-widest uppercase">
                            Social Media Marketing
                        </span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        Next-Gen{" "}
                        <span className="gradient-text">SMM Solutions</span>
                    </h2>
                    <p
                        className="text-lg max-w-3xl mx-auto mb-4"
                        style={{ color: "var(--muted)" }}
                    >
                        In today&apos;s fast-moving digital landscape, platforms like Instagram and Facebook aren&apos;t just social networks — they&apos;re where your next clients discover, evaluate, and choose you. If your brand isn&apos;t showing up with the right content at the right time, you&apos;re leaving revenue on the table.
                    </p>
                    <p
                        className="text-base max-w-2xl mx-auto"
                        style={{ color: "var(--muted)" }}
                    >
                        We combine AI-powered automation with studio-grade creative to give you premium-quality social media management — at a fraction of the time and cost.
                    </p>
                </motion.div>

                {/* Pillar cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={pillar.title}
                                className="relative group glass border border-white/8 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    delay: 0.2 + i * 0.15,
                                    duration: 0.7,
                                }}
                                style={{
                                    boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${pillar.color}08`,
                                }}
                            >
                                {/* Hover gradient */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at top left, ${pillar.color}15, transparent 70%)`,
                                    }}
                                />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                                        style={{
                                            background: `linear-gradient(135deg, ${pillar.color}30, ${pillar.color}10)`,
                                            border: `1px solid ${pillar.color}40`,
                                        }}
                                    >
                                        <Icon
                                            className="w-6 h-6"
                                            style={{ color: pillar.color }}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="font-display text-xl font-bold mb-3"
                                        style={{ color: "var(--foreground)" }}
                                    >
                                        {pillar.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="text-sm leading-relaxed mb-6"
                                        style={{ color: "var(--muted)" }}
                                    >
                                        {pillar.description}
                                    </p>

                                    {/* Highlights */}
                                    <div className="space-y-3">
                                        {pillar.highlights.map((h) => {
                                            const HIcon = h.icon;
                                            return (
                                                <div
                                                    key={h.label}
                                                    className="flex items-center gap-3"
                                                >
                                                    <HIcon
                                                        className="w-4 h-4 flex-shrink-0"
                                                        style={{
                                                            color: pillar.color,
                                                        }}
                                                    />
                                                    <span
                                                        className="text-sm"
                                                        style={{
                                                            color: "var(--muted)",
                                                        }}
                                                    >
                                                        {h.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Selling-point banner */}
                <motion.div
                    className="glass border border-white/10 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    style={{
                        boxShadow:
                            "0 8px 40px rgba(0,0,0,0.25), 0 0 60px rgba(139,92,246,0.06)",
                    }}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h4
                                className="font-display font-bold text-lg"
                                style={{ color: "var(--foreground)" }}
                            >
                                Premium Quality · Lower Price
                            </h4>
                            <p
                                className="text-sm"
                                style={{ color: "var(--muted)" }}
                            >
                                Massive time savings with AI-powered workflows —
                                studio-grade results at a fraction of the cost.
                            </p>
                        </div>
                    </div>
                    <a
                        href="https://www.kreonex.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-target flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(236,72,153,0.4))",
                            border: "1px solid rgba(139,92,246,0.5)",
                        }}
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
