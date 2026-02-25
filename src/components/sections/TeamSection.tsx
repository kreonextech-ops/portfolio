"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, TrendingUp, Palette } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Amit Sharma",
        role: "Founder & Tech Head",
        icon: Cpu,
        color: "#8b5cf6",
        gradient: "from-purple-500/20 to-blue-500/20",
        border: "border-purple-500/30",
        description:
            "Electronics & Communication Engineer and Full Stack Developer. Leads AI architecture and automation — from LLM pipelines to real-time agentic systems.",
        tags: ["AI Architecture", "Full Stack", "Automation"],
    },
    {
        name: "Akash Sharma",
        role: "Sales Head",
        icon: TrendingUp,
        color: "#3b82f6",
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/30",
        description:
            "Drives customer success through high-conversion sales strategies and sustainable business growth. Turns prospects into long-term partners.",
        tags: ["Customer Success", "Sales Strategy", "Growth"],
    },
    {
        name: "Chetna Gupta",
        role: "SMM Head",
        icon: Palette,
        color: "#ec4899",
        gradient: "from-pink-500/20 to-purple-500/20",
        border: "border-pink-500/30",
        description:
            "Specialist in content development and brand storytelling. Crafts narratives that resonate and converts audiences into communities.",
        tags: ["Content Strategy", "Brand Story", "Creative"],
    },
];

export default function TeamSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-radial from-purple-950/10 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
                            The Team
                        </span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        The Minds Behind{" "}
                        <span className="gradient-text">Kreonex</span>
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
                        A powerhouse team of engineers, strategists, and creatives building the future of digital.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, i) => {
                        const Icon = member.icon;
                        return (
                            <motion.div
                                key={member.name}
                                className={`relative group glass border ${member.border} rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                                style={{
                                    boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${member.color}08`,
                                }}
                            >
                                {/* Gradient glow behind card on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                <div className="relative z-10">
                                    {/* Icon + role badge */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                            style={{
                                                background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`,
                                                border: `1px solid ${member.color}40`,
                                            }}
                                        >
                                            <Icon className="w-6 h-6" style={{ color: member.color }} />
                                        </div>
                                        <span
                                            className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
                                            style={{
                                                background: `${member.color}15`,
                                                color: member.color,
                                                border: `1px solid ${member.color}30`,
                                            }}
                                        >
                                            {member.role}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3
                                        className="font-display text-2xl font-bold mb-3"
                                        style={{ color: "var(--foreground)" }}
                                    >
                                        {member.name}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="text-sm leading-relaxed mb-6"
                                        style={{ color: "var(--muted)" }}
                                    >
                                        {member.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {member.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[11px] font-medium px-3 py-1 rounded-full glass border border-white/10"
                                                style={{ color: "var(--muted)" }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
