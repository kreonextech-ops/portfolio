"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Tech {
    name: string;
    category: string;
    color: string;
    description: string;
    role: string;
}

const techStack: Tech[] = [
    { name: "Next.js", category: "Frontend", color: "#ffffff", description: "Full-stack React framework", role: "Web Applications" },
    { name: "Python", category: "Backend", color: "#3b82f6", description: "Backend & ML workloads", role: "AI & APIs" },
    { name: "PostgreSQL", category: "Database", color: "#336791", description: "Relational database engine", role: "Data Store" },
    { name: "React Native", category: "Mobile", color: "#61dafb", description: "Cross-platform mobile apps", role: "iOS & Android" },
    { name: "LangGraph", category: "AI", color: "#8b5cf6", description: "Stateful AI agent orchestration", role: "AI Workflows" },
    { name: "Supabase", category: "Backend", color: "#3ecf8e", description: "Open-source Firebase alternative", role: "Auth & DB" },
    { name: "Docker", category: "DevOps", color: "#2496ed", description: "Container orchestration", role: "Deployment" },
    { name: "AWS", category: "Cloud", color: "#ff9900", description: "Cloud infrastructure", role: "Scale & Reliability" },
    { name: "GPT-4o", category: "AI", color: "#10b981", description: "Frontier language model", role: "AI Reasoning" },
    { name: "Redis", category: "Database", color: "#dc382d", description: "In-memory caching layer", role: "Performance" },
    { name: "Tailwind", category: "Frontend", color: "#06b6d4", description: "Utility-first CSS framework", role: "UI Styling" },
    { name: "Node.js", category: "Backend", color: "#68a063", description: "JavaScript runtime", role: "API Server" },
    { name: "Framer Motion", category: "Frontend", color: "#ec4899", description: "Animation library", role: "Interactions" },
    { name: "GraphQL", category: "API", color: "#e535ab", description: "API query language", role: "Data Fetching" },
    { name: "Swift", category: "Mobile", color: "#fa7343", description: "Native iOS development", role: "iOS Native" },
];

function TechSphere({ tech, index, containerInView }: { tech: Tech; index: number; containerInView: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    const positions = [
        { x: 50, y: 20 }, { x: 80, y: 30 }, { x: 90, y: 55 }, { x: 80, y: 78 },
        { x: 60, y: 88 }, { x: 40, y: 88 }, { x: 20, y: 78 }, { x: 10, y: 55 },
        { x: 20, y: 30 }, { x: 38, y: 20 }, { x: 65, y: 45 }, { x: 35, y: 45 },
        { x: 50, y: 62 }, { x: 72, y: 65 }, { x: 28, y: 65 },
    ];
    const pos = positions[index % positions.length];
    const sizes = [52, 46, 40, 44, 48, 42, 50, 44, 46, 40, 52, 44, 46, 42, 48];
    const size = sizes[index % sizes.length];

    return (
        <motion.div
            className="absolute cursor-default hover-target"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={containerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + index * 0.06, duration: 0.6, ease: "backOut" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.2, zIndex: 10 }}
        >
            {/* Sphere */}
            <div
                className="rounded-full flex items-center justify-center relative transition-all duration-300"
                style={{
                    width: size,
                    height: size,
                    background: `radial-gradient(circle at 35% 35%, ${tech.color}30, ${tech.color}08)`,
                    border: `1px solid ${tech.color}${isHovered ? "60" : "25"}`,
                    boxShadow: isHovered ? `0 0 30px ${tech.color}40, 0 0 60px ${tech.color}15` : `0 0 15px ${tech.color}10`,
                }}
            >
                <span
                    className="font-display font-bold select-none"
                    style={{
                        fontSize: size > 46 ? "9px" : "8px",
                        color: tech.color,
                        opacity: isHovered ? 1 : 0.7,
                    }}
                >
                    {tech.name.length > 6 ? tech.name.slice(0, 6) : tech.name}
                </span>
            </div>

            {/* Tooltip */}
            {isHovered && (
                <motion.div
                    className="absolute z-20 glass-strong border border-white/10 rounded-xl p-3 min-w-[160px] pointer-events-none"
                    style={{ bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <div className="font-display font-semibold text-white text-xs mb-0.5">{tech.name}</div>
                    <div className="text-white/40 text-[10px] mb-1">{tech.description}</div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: tech.color }} />
                        <span className="text-[10px]" style={{ color: tech.color }}>{tech.role}</span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default function TechSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/3" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-purple-500/10 animate-spin-slow" />
            <div className="absolute inset-0 bg-gradient-radial from-cyan-950/10 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">Tech Stack</span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        Powered by the <span className="gradient-text">Best in Class</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-xl mx-auto">Hover over any orbit to discover our full technology stack and its role in your ecosystem.</p>
                </motion.div>

                {/* Sphere orbit map */}
                <div className="relative mx-auto" style={{ width: "min(700px, 100%)", height: "600px" }}>
                    {/* Center core */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-10"
                        style={{
                            width: 90,
                            height: 90,
                            background: "radial-gradient(circle, rgba(139,92,246,0.4), rgba(59,130,246,0.1))",
                            border: "1px solid rgba(139,92,246,0.5)",
                            boxShadow: "0 0 60px rgba(139,92,246,0.3)",
                        }}
                        animate={{ scale: [1, 1.06, 1], boxShadow: ["0 0 40px rgba(139,92,246,0.2)", "0 0 70px rgba(139,92,246,0.4)", "0 0 40px rgba(139,92,246,0.2)"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <span className="font-display font-bold text-white text-[11px] text-center leading-tight px-2">AI<br />Core</span>
                    </motion.div>

                    {/* Tech spheres */}
                    {techStack.map((tech, i) => (
                        <TechSphere key={tech.name} tech={tech} index={i} containerInView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
