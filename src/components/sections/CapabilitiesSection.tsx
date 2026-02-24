"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Zap, Smartphone, BarChart3, Workflow, Shield, Globe, Database, Code2 } from "lucide-react";

const capabilities = [
    {
        icon: Brain,
        title: "AI Systems & LLM Integration",
        description: "Custom language model pipelines, RAG systems, intelligent agents, and AI workflows trained on your business data.",
        tags: ["GPT-4o", "LangGraph", "RAG", "Agents"],
        color: "#8b5cf6",
        glow: "rgba(139,92,246,0.3)",
    },
    {
        icon: BarChart3,
        title: "CRM & ERP Platforms",
        description: "Full-stack business management systems with real-time dashboards, pipeline automation, and AI-powered insights.",
        tags: ["Lead Scoring", "Analytics", "Automation"],
        color: "#3b82f6",
        glow: "rgba(59,130,246,0.3)",
    },
    {
        icon: Smartphone,
        title: "iOS & Android Apps",
        description: "Native and cross-platform mobile apps with offline sync, push notifications, and seamless cloud connectivity.",
        tags: ["React Native", "Swift", "Kotlin"],
        color: "#f59e0b",
        glow: "rgba(245,158,11,0.3)",
    },
    {
        icon: Workflow,
        title: "AI Automation Pipelines",
        description: "End-to-end workflow automation connecting AI agents, APIs, databases, and communication channels.",
        tags: ["n8n", "Zapier", "Custom Bots"],
        color: "#06b6d4",
        glow: "rgba(6,182,212,0.3)",
    },
    {
        icon: Globe,
        title: "SaaS Platform Development",
        description: "Complete SaaS products from architecture to launch: multi-tenancy, billing, auth, and analytics dashboards.",
        tags: ["Next.js", "Stripe", "RBAC"],
        color: "#10b981",
        glow: "rgba(16,185,129,0.3)",
    },
    {
        icon: Code2,
        title: "Custom API & Backend",
        description: "High-performance REST and GraphQL APIs, microservices architectures, and real-time data pipelines.",
        tags: ["Node.js", "Python", "PostgreSQL"],
        color: "#ec4899",
        glow: "rgba(236,72,153,0.3)",
    },
    {
        icon: Shield,
        title: "Security & Compliance",
        description: "SOC2-ready infrastructure, end-to-end encryption, penetration testing, and GDPR-compliant data pipelines.",
        tags: ["GDPR", "SOC2", "Zero Trust"],
        color: "#f43f5e",
        glow: "rgba(244,63,94,0.3)",
    },
    {
        icon: Database,
        title: "Data Infrastructure",
        description: "Scalable databases, vector stores, caching layers, and analytics warehouses for high-volume applications.",
        tags: ["Supabase", "Redis", "BigQuery"],
        color: "#a78bfa",
        glow: "rgba(167,139,250,0.3)",
    },
    {
        icon: Zap,
        title: "WhatsApp & Omnichannel AI",
        description: "Intelligent bots across WhatsApp, Telegram, email, and SMS with context retention and human handoff.",
        tags: ["Meta API", "Twilio", "SendGrid"],
        color: "#34d399",
        glow: "rgba(52,211,153,0.3)",
    },
];

function TiltCard({ cap, index }: { cap: typeof capabilities[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "800px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false); }}
            className="hover-target"
        >
            <div
                className="relative p-6 rounded-2xl glass border border-white/8 h-full overflow-hidden group transition-all duration-500"
                style={{
                    boxShadow: isHovered ? `0 0 40px ${cap.glow}, 0 20px 60px rgba(0,0,0,0.5)` : "none",
                    borderColor: isHovered ? `${cap.color}40` : "rgba(255,255,255,0.08)",
                }}
            >
                {/* BG glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${cap.glow} 0%, transparent 70%)` }}
                />

                {/* Icon */}
                <div
                    className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}30` }}
                >
                    <cap.icon className="w-6 h-6" style={{ color: cap.color }} />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-white text-base mb-3 leading-tight relative z-10">
                    {cap.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4 relative z-10">{cap.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 relative z-10">
                    {cap.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ background: `${cap.color}15`, color: cap.color }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Corner accent */}
                <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ background: cap.color }}
                />
            </div>
        </motion.div>
    );
}

export default function CapabilitiesSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="capabilities" ref={ref} className="relative py-32 px-6">
            <div className="absolute inset-0 bg-gradient-radial from-blue-950/10 via-transparent to-transparent" />
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-medium text-blue-300 tracking-widest uppercase">Capabilities</span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        Engineering at Every <span className="gradient-text">Scale</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                        Nine specialized capability areas forming a unified, intelligent engineering ecosystem.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {capabilities.map((cap, i) => (
                        <TiltCard key={cap.title} cap={cap} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
