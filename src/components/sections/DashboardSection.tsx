"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, DollarSign, Bell, CheckCircle2, ArrowUpRight, Zap } from "lucide-react";

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();
        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, target]);

    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const kpiData = [
    { icon: DollarSign, label: "Revenue This Month", value: 284500, prefix: "$", suffix: "", change: "+18.4%", color: "#10b981" },
    { icon: Users, label: "Active Leads", value: 1847, prefix: "", suffix: "", change: "+243", color: "#3b82f6" },
    { icon: TrendingUp, label: "Pipeline Value", value: 2100000, prefix: "$", suffix: "", change: "+12.1%", color: "#8b5cf6" },
    { icon: CheckCircle2, label: "Deals Closed", value: 68, prefix: "", suffix: "", change: "this month", color: "#f59e0b" },
];

const notifications = [
    { text: "New Lead Captured", sub: "sarah.johnson@techcorp.com", color: "#10b981", time: "now" },
    { text: "Deal Closed — $48K", sub: "Techcorp Enterprise License", color: "#8b5cf6", time: "2m" },
    { text: "AI Insight Ready", sub: "Pipeline forecast updated", color: "#3b82f6", time: "5m" },
    { text: "Email Campaign Sent", sub: "2,400 recipients reached", color: "#f59e0b", time: "12m" },
];

const chartBars = [45, 62, 38, 78, 55, 90, 72, 85, 63, 95, 80, 100];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export default function DashboardSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [activeNotif, setActiveNotif] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const interval = setInterval(() => setActiveNotif(i => (i + 1) % notifications.length), 2500);
        return () => clearInterval(interval);
    }, [inView]);

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-green-950/8 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-green-300 tracking-widest uppercase">CRM & ERP</span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        Intelligence Built <span className="gradient-text">Into Every Dashboard</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Real-time business intelligence, AI insights, and automated workflows — all in one unified system.
                    </p>
                </motion.div>

                {/* Dashboard Mockup */}
                <motion.div
                    className="relative rounded-3xl overflow-hidden border border-white/8"
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 80px rgba(16,185,129,0.1)" }}
                >
                    {/* Dashboard top bar */}
                    <div className="glass-strong border-b border-white/5 px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex gap-1.5">
                                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                                ))}
                            </div>
                            <div className="flex gap-6">
                                {["Overview", "Leads", "Pipeline", "Analytics", "AI Insights"].map((tab, i) => (
                                    <span key={tab} className={`text-xs font-medium cursor-default ${i === 0 ? "text-purple-400 border-b border-purple-500 pb-0.5" : "text-white/30"}`}>
                                        {tab}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-white/30">Live Data</span>
                        </div>
                    </div>

                    <div className="bg-zinc-950/80 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: KPI Cards */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* KPI Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {kpiData.map((kpi, i) => (
                                    <motion.div
                                        key={kpi.label}
                                        className="glass border border-white/5 rounded-xl p-4"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white/40 text-[10px] uppercase tracking-wider">{kpi.label}</span>
                                            <kpi.icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
                                        </div>
                                        <div className="font-display text-xl font-bold text-white">
                                            <CountUp target={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
                                        </div>
                                        <div className="text-[10px] mt-1.5" style={{ color: kpi.color }}>{kpi.change}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Chart */}
                            <motion.div
                                className="glass border border-white/5 rounded-xl p-5"
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.7, duration: 0.6 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="font-display font-semibold text-white text-sm">Revenue Trend</div>
                                        <div className="text-white/30 text-xs">Monthly performance overview</div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                        +23.8% YoY
                                    </div>
                                </div>
                                <div className="flex items-end gap-1.5 h-28">
                                    {chartBars.map((bar, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                            <motion.div
                                                className="w-full rounded-t-sm min-w-[6px]"
                                                style={{ background: i === 11 ? "linear-gradient(to top, #8b5cf6, #3b82f6)" : "rgba(139,92,246,0.25)" }}
                                                initial={{ height: 0 }}
                                                animate={inView ? { height: `${bar}%` } : { height: 0 }}
                                                transition={{ delay: 0.8 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                            <span className="text-[8px] text-white/20">{months[i]}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Pipeline */}
                            <motion.div
                                className="glass border border-white/5 rounded-xl p-5"
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.9, duration: 0.6 }}
                            >
                                <div className="font-display font-semibold text-white text-sm mb-4">AI Pipeline Score</div>
                                {[
                                    { stage: "Qualified", count: 42, pct: 85 },
                                    { stage: "Proposal", count: 28, pct: 62 },
                                    { stage: "Negotiation", count: 16, pct: 38 },
                                    { stage: "Closing", count: 7, pct: 20 },
                                ].map((stage) => (
                                    <div key={stage.stage} className="flex items-center gap-4 mb-3">
                                        <span className="text-white/40 text-xs w-24">{stage.stage}</span>
                                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                                                initial={{ width: 0 }}
                                                animate={inView ? { width: `${stage.pct}%` } : { width: 0 }}
                                                transition={{ delay: 1 + stage.pct * 0.005, duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                        <span className="text-white/50 text-xs w-10 text-right">{stage.count}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Notifications + AI Panel */}
                        <div className="space-y-4">
                            {/* Notification feed */}
                            <div className="glass border border-white/5 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-display text-sm font-semibold text-white">Live Activity</span>
                                    <Bell className="w-3.5 h-3.5 text-white/30" />
                                </div>
                                <div className="space-y-2.5">
                                    {notifications.map((notif, i) => (
                                        <motion.div
                                            key={i}
                                            className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-500 ${i === activeNotif ? "bg-white/5 border border-white/8" : ""}`}
                                            animate={{ opacity: i === activeNotif ? 1 : 0.4 }}
                                        >
                                            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 animate-pulse" style={{ background: notif.color }} />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-medium text-white truncate">{notif.text}</div>
                                                <div className="text-[10px] text-white/30 truncate">{notif.sub}</div>
                                            </div>
                                            <span className="text-[10px] text-white/20 shrink-0">{notif.time}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Insights Panel */}
                            <div className="glass border border-purple-500/20 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Zap className="w-4 h-4 text-purple-400" />
                                    <span className="font-display text-sm font-semibold text-white">AI Insights</span>
                                    <span className="ml-auto text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Live</span>
                                </div>
                                {[
                                    { insight: "Lead retention up 24% — nurture campaign recommended", confidence: 92 },
                                    { insight: "3 deals at high churn risk — schedule follow-up", confidence: 87 },
                                    { insight: "Q4 revenue forecast: $2.8M (+31% vs Q3)", confidence: 78 },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="mb-3 last:mb-0 p-3 bg-purple-500/5 rounded-lg border border-purple-500/10"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                                    >
                                        <div className="text-xs text-white/60 leading-relaxed mb-1.5">{item.insight}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1 bg-white/5 rounded-full">
                                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.confidence}%` }} />
                                            </div>
                                            <span className="text-[10px] text-purple-400">{item.confidence}%</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
