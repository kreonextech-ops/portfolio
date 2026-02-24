"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Minus } from "lucide-react";

const features = [
    "AI Lead Scoring",
    "Pipeline Automation",
    "Email Sequences",
    "WhatsApp Integration",
    "Mobile App",
    "Offline Sync",
    "Analytics Dashboard",
    "AI Insights",
    "Custom Reports",
    "Role-Based Access",
    "API Webhooks",
    "Audit Logs",
    "Multi-tenancy",
    "White-labeling",
    "Priority Support",
];

type ColKey = "crm" | "erp" | "mobile" | "ai";

const columns: { key: ColKey; label: string; color: string; sub: string }[] = [
    { key: "crm", label: "CRM System", color: "#3b82f6", sub: "Sales & Marketing" },
    { key: "erp", label: "ERP Platform", color: "#10b981", sub: "Operations & Finance" },
    { key: "mobile", label: "Mobile Apps", color: "#f59e0b", sub: "iOS & Android" },
    { key: "ai", label: "AI Systems", color: "#8b5cf6", sub: "Intelligence Layer" },
];

const matrix: Record<ColKey, (boolean | "partial")[]> = {
    crm: [true, true, true, true, false, false, true, true, false, true, true, true, true, true, true],
    erp: [false, true, false, false, false, false, true, true, true, true, true, true, true, true, true],
    mobile: [false, false, false, true, true, true, true, false, false, true, true, false, false, false, true],
    ai: [true, true, true, true, false, false, true, true, false, true, true, true, true, "partial", true],
};

export default function MatrixSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-blue-950/8 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-medium text-blue-300 tracking-widest uppercase">Enterprise Matrix</span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        Full Stack, <span className="gradient-text">Full Power</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        A comprehensive breakdown of feature coverage across every platform we build. Click a row to explore what each platform delivers.
                    </p>
                </motion.div>

                <motion.div
                    className="glass border border-white/8 rounded-3xl overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}
                >
                    {/* Table header */}
                    <div className="glass-strong border-b border-white/5">
                        <div className="grid grid-cols-5 items-center">
                            <div className="px-6 py-5 text-white/20 text-xs uppercase tracking-wider font-medium">Feature</div>
                            {columns.map(col => (
                                <div key={col.key} className="px-4 py-5 text-center border-l border-white/5">
                                    <div className="font-display font-semibold text-white text-sm mb-0.5" style={{ color: col.color }}>{col.label}</div>
                                    <div className="text-white/30 text-[10px]">{col.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Table rows */}
                    <div>
                        {features.map((feature, rowIdx) => (
                            <div key={feature}>
                                <motion.div
                                    className={`grid grid-cols-5 items-center cursor-pointer border-b border-white/3 hover:bg-white/2 transition-colors duration-200 ${expandedRow === rowIdx ? "bg-white/3" : ""}`}
                                    onClick={() => setExpandedRow(expandedRow === rowIdx ? null : rowIdx)}
                                    initial={{ opacity: 0 }}
                                    animate={inView ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.3 + rowIdx * 0.04, duration: 0.5 }}
                                >
                                    <div className="px-6 py-4 text-white/60 text-sm font-medium flex items-center gap-2">
                                        <Minus className="w-3 h-3 text-white/20 shrink-0" />
                                        {feature}
                                    </div>
                                    {columns.map(col => {
                                        const val = matrix[col.key][rowIdx];
                                        return (
                                            <div key={col.key} className="px-4 py-4 flex justify-center border-l border-white/3">
                                                {val === true ? (
                                                    <CheckCircle2 className="w-4 h-4" style={{ color: col.color }} />
                                                ) : val === "partial" ? (
                                                    <div className="w-4 h-4 rounded-full border-2 border-dashed" style={{ borderColor: col.color, opacity: 0.5 }} />
                                                ) : (
                                                    <Minus className="w-4 h-4 text-white/10" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </motion.div>

                                {/* Expanded row */}
                                {expandedRow === rowIdx && (
                                    <motion.div
                                        className="bg-white/2 border-b border-white/5 px-6 py-4"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-white/40 text-xs leading-relaxed max-w-2xl">
                                            <strong className="text-white/70">{feature}</strong> — This feature unlocks across platforms that support it, enabling seamless data sync, automation, and real-time AI processing across your entire digital infrastructure.
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {columns.filter(c => matrix[c.key][rowIdx]).map(c => (
                                                <span key={c.key} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${c.color}15`, color: c.color }}>
                                                    {c.label}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
