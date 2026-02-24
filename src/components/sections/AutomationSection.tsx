"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Bot, Mail, MessageCircle, Smartphone, Database, Zap, ArrowRight } from "lucide-react";

const workflowNodes = [
    { id: "trigger", type: "trigger", label: "New Lead", icon: Zap, x: 5, y: 40, color: "#f59e0b", description: "CRM Trigger" },
    { id: "ai", type: "ai", label: "AI Agent", icon: Bot, x: 28, y: 20, color: "#8b5cf6", description: "Classify & score lead" },
    { id: "crm", type: "action", label: "Update CRM", icon: Database, x: 28, y: 60, color: "#3b82f6", description: "Assign & tag contact" },
    { id: "whatsapp", type: "action", label: "WhatsApp", icon: MessageCircle, x: 52, y: 15, color: "#10b981", description: "Send intro message" },
    { id: "email", type: "action", label: "Email Seq.", icon: Mail, x: 52, y: 50, color: "#06b6d4", description: "Drip campaign start" },
    { id: "mobile", type: "notify", label: "Push Alert", icon: Smartphone, x: 52, y: 82, color: "#ec4899", description: "Notify sales team" },
    { id: "followup", type: "ai", label: "AI Follow-up", icon: Bot, x: 76, y: 32, color: "#a78bfa", description: "Auto-schedule call" },
    { id: "success", type: "end", label: "Deal Won", icon: Zap, x: 92, y: 32, color: "#10b981", description: "Pipeline updated" },
];

const workflowEdges = [
    { from: "trigger", to: "ai" },
    { from: "trigger", to: "crm" },
    { from: "ai", to: "whatsapp" },
    { from: "ai", to: "email" },
    { from: "crm", to: "mobile" },
    { from: "whatsapp", to: "followup" },
    { from: "email", to: "followup" },
    { from: "followup", to: "success" },
];

const stats = [
    { value: "3 min", label: "Avg. response time" },
    { value: "94%", label: "Lead conversion rate" },
    { value: "8x", label: "Faster workflows" },
];

export default function AutomationSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const progressWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

    const W = 700;
    const H = 300;

    function getPos(node: typeof workflowNodes[0]) {
        return { x: (node.x / 100) * W, y: (node.y / 100) * H };
    }

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-purple-950/15 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">AI Automation</span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        Workflows That <span className="gradient-text">Think for Themselves</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Complex multi-channel automation pipelines driven by intelligent AI agents — from first touch to closed deal.
                    </p>
                </motion.div>

                {/* Workflow Builder */}
                <motion.div
                    className="glass border border-white/8 rounded-3xl overflow-hidden mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(139,92,246,0.08)" }}
                >
                    {/* Header bar */}
                    <div className="glass-strong border-b border-white/5 px-6 py-3.5 flex items-center gap-4">
                        <div className="flex gap-1.5">
                            {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                        </div>
                        <span className="text-xs text-white/40">AI Automation Studio — Lead Nurture Pipeline</span>
                        <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-green-400">Live</span>
                        </div>
                    </div>

                    {/* Scroll progress bar */}
                    <div className="h-0.5 w-full bg-white/5">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
                            style={{ width: progressWidth }}
                        />
                    </div>

                    {/* Canvas */}
                    <div
                        className="relative"
                        style={{
                            background: "radial-gradient(ellipse 60% 80% at 40% 60%, rgba(139,92,246,0.04) 0%, transparent 70%), #050507",
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                        }}
                    >
                        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minHeight: "280px" }}>
                            <defs>
                                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L6,3 z" fill="rgba(139,92,246,0.5)" />
                                </marker>
                                {workflowNodes.map(node => (
                                    <radialGradient key={node.id} id={`n-glow-${node.id}`} cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor={node.color} stopOpacity="0.2" />
                                        <stop offset="100%" stopColor={node.color} stopOpacity="0" />
                                    </radialGradient>
                                ))}
                            </defs>

                            {/* Edges */}
                            {workflowEdges.map((edge, i) => {
                                const from = workflowNodes.find(n => n.id === edge.from)!;
                                const to = workflowNodes.find(n => n.id === edge.to)!;
                                const fp = getPos(from), tp = getPos(to);
                                const mx = (fp.x + tp.x) / 2;
                                return (
                                    <g key={i}>
                                        <path
                                            d={`M ${fp.x} ${fp.y} C ${mx} ${fp.y}, ${mx} ${tp.y}, ${tp.x} ${tp.y}`}
                                            fill="none"
                                            stroke="rgba(255,255,255,0.07)"
                                            strokeWidth="1.5"
                                            markerEnd="url(#arrow)"
                                        />
                                        <motion.path
                                            d={`M ${fp.x} ${fp.y} C ${mx} ${fp.y}, ${mx} ${tp.y}, ${tp.x} ${tp.y}`}
                                            fill="none"
                                            stroke={from.color}
                                            strokeWidth="1"
                                            strokeDasharray="6 3"
                                            strokeOpacity="0.6"
                                            initial={{ pathLength: 0 }}
                                            animate={inView ? { pathLength: 1 } : {}}
                                            transition={{ delay: 0.8 + i * 0.12, duration: 1, ease: "easeInOut" }}
                                        />
                                    </g>
                                );
                            })}

                            {/* Nodes */}
                            {workflowNodes.map((node, i) => {
                                const pos = getPos(node);
                                return (
                                    <motion.g
                                        key={node.id}
                                        transform={`translate(${pos.x}, ${pos.y})`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "backOut" }}
                                    >
                                        <circle r="36" fill={`url(#n-glow-${node.id})`} />
                                        <rect x="-28" y="-20" width="56" height="40" rx="10" fill="rgba(10,10,15,0.9)" stroke={node.color} strokeWidth="1.5" strokeOpacity="0.6" />
                                        <text textAnchor="middle" dy="4" fill="white" fontSize="8.5" fontFamily="Space Grotesk, sans-serif" fontWeight="600">{node.label}</text>
                                        <text textAnchor="middle" dy="-8" fill={node.color} fontSize="6.5" fontFamily="Inter, sans-serif" opacity="0.7">{node.description}</text>
                                    </motion.g>
                                );
                            })}
                        </svg>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="text-center glass border border-white/8 rounded-2xl p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                        >
                            <div className="font-display text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                            <div className="text-white/40 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
