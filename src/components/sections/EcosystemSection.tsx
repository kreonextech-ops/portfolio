"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Users, BarChart3, Smartphone, Bot, Server } from "lucide-react";

interface Node {
    id: string;
    label: string;
    icon: React.ElementType;
    x: number;
    y: number;
    color: string;
    glow: string;
    description: string;
    tags: string[];
}

const nodes: Node[] = [
    { id: "center", label: "AI Core", icon: Bot, x: 50, y: 45, color: "#8b5cf6", glow: "rgba(139,92,246,0.6)", description: "Central AI orchestrator managing all system intelligence", tags: ["GPT-4o", "LangGraph", "RAG"] },
    { id: "website", label: "Website & CMS", icon: Globe, x: 18, y: 18, color: "#06b6d4", glow: "rgba(6,182,212,0.6)", description: "High-performance web platforms with CMS integration", tags: ["Next.js", "Headless CMS", "CDN"] },
    { id: "crm", label: "CRM System", icon: Users, x: 82, y: 18, color: "#3b82f6", glow: "rgba(59,130,246,0.6)", description: "Smart CRM with AI lead scoring and pipeline automation", tags: ["Lead Scoring", "Email Sync", "Analytics"] },
    { id: "erp", label: "ERP Platform", icon: BarChart3, x: 82, y: 73, color: "#10b981", glow: "rgba(16,185,129,0.6)", description: "Enterprise resource planning with real-time dashboards", tags: ["Finance", "Inventory", "Reporting"] },
    { id: "mobile", label: "Mobile Apps", icon: Smartphone, x: 18, y: 73, color: "#f59e0b", glow: "rgba(245,158,11,0.6)", description: "Native iOS & Android apps with offline sync", tags: ["React Native", "Push Notifications", "Offline"] },
    { id: "infra", label: "Cloud Infra", icon: Server, x: 50, y: 90, color: "#ec4899", glow: "rgba(236,72,153,0.6)", description: "Scalable cloud infrastructure and API gateway", tags: ["AWS", "Docker", "CI/CD"] },
];

const connections = [
    { from: "center", to: "website" },
    { from: "center", to: "crm" },
    { from: "center", to: "erp" },
    { from: "center", to: "mobile" },
    { from: "center", to: "infra" },
    { from: "crm", to: "erp" },
    { from: "website", to: "crm" },
    { from: "mobile", to: "infra" },
];

function getNodePos(id: string, containerW: number, containerH: number) {
    const node = nodes.find(n => n.id === id)!;
    return {
        x: (node.x / 100) * containerW,
        y: (node.y / 100) * containerH,
    };
}

export default function EcosystemSection() {
    const ref = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [dimensions] = useState({ w: 700, h: 420 });

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-purple-950/20 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">Digital Ecosystem</span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        One Studio. <span className="gradient-text">Infinite Connections.</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                        Every product we build is part of a living, interconnected system — orchestrated by an intelligent AI core.
                    </p>
                </motion.div>

                {/* Ecosystem Map */}
                <motion.div
                    className="relative w-full max-w-3xl mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="glass border border-white/8 rounded-3xl p-8 relative overflow-hidden">
                        {/* Animated background grid */}
                        <div
                            className="absolute inset-0 opacity-[0.04] rounded-3xl"
                            style={{
                                backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
                                backgroundSize: "40px 40px",
                            }}
                        />

                        <svg
                            ref={svgRef}
                            viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
                            className="w-full h-auto"
                            style={{ minHeight: "320px" }}
                        >
                            <defs>
                                {nodes.map(node => (
                                    <radialGradient key={node.id} id={`glow-${node.id}`} cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor={node.color} stopOpacity="0.3" />
                                        <stop offset="100%" stopColor={node.color} stopOpacity="0" />
                                    </radialGradient>
                                ))}
                                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L6,3 z" fill="rgba(139,92,246,0.4)" />
                                </marker>
                            </defs>

                            {/* Connection lines */}
                            {connections.map(conn => {
                                const from = getNodePos(conn.from, dimensions.w, dimensions.h);
                                const to = getNodePos(conn.to, dimensions.w, dimensions.h);
                                const isActive = hoveredNode === conn.from || hoveredNode === conn.to;
                                const midX = (from.x + to.x) / 2;
                                const midY = (from.y + to.y) / 2 - 20;
                                return (
                                    <g key={`${conn.from}-${conn.to}`}>
                                        <path
                                            d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                                            fill="none"
                                            stroke={isActive ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.06)"}
                                            strokeWidth={isActive ? 1.5 : 1}
                                            style={{ transition: "stroke 0.3s" }}
                                        />
                                        {isActive && (
                                            <path
                                                d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                                                fill="none"
                                                stroke="rgba(139,92,246,0.8)"
                                                strokeWidth="2"
                                                strokeDasharray="8 4"
                                                className="animated-dash"
                                            />
                                        )}
                                    </g>
                                );
                            })}

                            {/* Nodes */}
                            {nodes.map((node, i) => {
                                const pos = getNodePos(node.id, dimensions.w, dimensions.h);
                                const isHovered = hoveredNode === node.id;
                                const isCenter = node.id === "center";
                                return (
                                    <g
                                        key={node.id}
                                        transform={`translate(${pos.x}, ${pos.y})`}
                                        onMouseEnter={() => setHoveredNode(node.id)}
                                        onMouseLeave={() => setHoveredNode(null)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {/* Glow ring */}
                                        <circle
                                            r={isCenter ? 55 : 42}
                                            fill={`url(#glow-${node.id})`}
                                            opacity={isHovered ? 1 : 0.4}
                                        />
                                        {/* Outer ring */}
                                        <circle
                                            r={isCenter ? 34 : 26}
                                            fill="rgba(0,0,0,0.5)"
                                            stroke={node.color}
                                            strokeWidth={isHovered ? 2 : 1}
                                            strokeOpacity={isHovered ? 0.9 : 0.4}
                                        />
                                        {/* Inner circle */}
                                        <circle
                                            r={isCenter ? 22 : 16}
                                            fill={`${node.color}20`}
                                        />
                                        {/* Label */}
                                        <text
                                            textAnchor="middle"
                                            dy={isCenter ? "50" : "42"}
                                            fill="white"
                                            fontSize={isCenter ? "11" : "10"}
                                            fontFamily="Space Grotesk, sans-serif"
                                            fontWeight="500"
                                            opacity={0.8}
                                        >
                                            {node.label}
                                        </text>
                                        {/* Icon placeholder as circle */}
                                        <circle r={isCenter ? 8 : 6} fill={node.color} opacity={0.7} />
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Hover tooltip */}
                        {hoveredNode && (() => {
                            const node = nodes.find(n => n.id === hoveredNode)!;
                            return (
                                <motion.div
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-strong border border-white/10 rounded-2xl p-4 min-w-[260px] z-20"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: node.color }} />
                                        <span className="font-display font-semibold text-white text-sm">{node.label}</span>
                                    </div>
                                    <p className="text-white/50 text-xs leading-relaxed mb-3">{node.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {node.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: `${node.color}20`, color: node.color }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
