"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Wifi, Bell, Lock, Database, Zap, MessageCircle } from "lucide-react";

const appScreens = [
    {
        title: "AI Assistant",
        bg: "from-purple-900/80 to-black",
        content: (
            <div className="p-4 space-y-3">
                <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-500/30 flex items-center justify-center shrink-0">
                        <Zap className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-none px-3 py-2 text-[10px] text-white/70 leading-relaxed max-w-[80%]">
                        I've analyzed your pipeline. You have 3 deals likely to close this week worth $127K combined.
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <div className="bg-purple-600/40 rounded-2xl rounded-tr-none px-3 py-2 text-[10px] text-white/80 max-w-[80%]">
                        Show me the top priority accounts
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-500/30 flex items-center justify-center shrink-0">
                        <Zap className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-none px-3 py-2 text-[10px] text-white/70 leading-relaxed max-w-[80%]">
                        Top 3: Techcorp ($48K), Verizon Retail ($38K), Quantum Systems ($41K)
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Dashboard",
        bg: "from-blue-900/80 to-black",
        content: (
            <div className="p-4">
                <div className="text-[10px] text-white/40 mb-2">Today's Performance</div>
                {[
                    { label: "Revenue", val: "$24.2K", pct: 78, color: "#3b82f6" },
                    { label: "New Leads", val: "47", pct: 62, color: "#8b5cf6" },
                    { label: "Conversions", val: "12", pct: 45, color: "#10b981" },
                ].map(item => (
                    <div key={item.label} className="mb-3">
                        <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-white/50">{item.label}</span>
                            <span className="text-white/80">{item.val}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full">
                            <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                        </div>
                    </div>
                ))}
                <div className="grid grid-cols-3 gap-1.5 mt-4">
                    {["#4CAF", "#8XZ2", "#9PRQ"].map((code) => (
                        <div key={code} className="bg-white/5 rounded-lg p-2 text-center">
                            <div className="text-[8px] text-white/30 truncate">{code}</div>
                            <div className="text-[10px] text-green-400 font-bold">Hot</div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: "Notifications",
        bg: "from-cyan-900/80 to-black",
        content: (
            <div className="p-4 space-y-2">
                {[
                    { title: "Lead Assigned", body: "New enterprise lead - Quantum Inc.", time: "now", color: "#8b5cf6" },
                    { title: "Deal Closed", body: "$38K contract signed", time: "5m", color: "#10b981" },
                    { title: "Task Due", body: "Follow-up call with TechCorp", time: "1h", color: "#f59e0b" },
                    { title: "AI Alert", body: "3 accounts at churn risk", time: "2h", color: "#f43f5e" },
                ].map((n, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-white/3 rounded-xl p-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: n.color }} />
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-medium text-white/80">{n.title}</div>
                            <div className="text-[9px] text-white/40 truncate">{n.body}</div>
                        </div>
                        <span className="text-[8px] text-white/20 shrink-0">{n.time}</span>
                    </div>
                ))}
            </div>
        ),
    },
];

const features = [
    { icon: MessageCircle, label: "AI Chat Assistant" },
    { icon: Bell, label: "Push Notifications" },
    { icon: Database, label: "Offline Sync" },
    { icon: Lock, label: "Secure APIs" },
    { icon: Wifi, label: "Real-Time Data" },
    { icon: Zap, label: "Fast Performance" },
];

function PhoneMockup({ screenIndex, screenData, offsetX, delay }: {
    screenIndex: number;
    screenData: typeof appScreens[0];
    offsetX: number;
    delay: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-100, 100], [8, -8]), { stiffness: 200, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), { stiffness: 200, damping: 25 });

    return (
        <motion.div
            ref={ref}
            className="relative"
            style={{ rotateX, rotateY, translateX: offsetX, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 80, rotateX: 20 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left - rect.width / 2);
                mouseY.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
            {/* Phone Frame */}
            <div
                className="relative w-52 h-[420px] rounded-[36px] overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
            >
                {/* Phone notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30 flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    <div className="w-4 h-1 rounded-full bg-zinc-700" />
                </div>

                {/* Screen content */}
                <div className={`absolute inset-0 bg-gradient-to-b ${screenData.bg}`}>
                    <div className="pt-12 h-full overflow-hidden">
                        <div className="px-3 py-2 flex items-center justify-between">
                            <span className="text-[10px] text-white/50 font-display font-medium">{screenData.title}</span>
                            <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-white/30" />
                                <div className="w-1 h-1 rounded-full bg-white/30" />
                                <div className="w-1 h-1 rounded-full bg-white/30" />
                            </div>
                        </div>
                        {screenData.content}
                    </div>
                </div>

                {/* Bottom home bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />

                {/* Reflection overlay */}
                <div
                    className="absolute inset-0 rounded-[36px] opacity-30 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)" }}
                />
            </div>
        </motion.div>
    );
}

export default function MobileSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-yellow-950/8 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-yellow-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                        <span className="text-xs font-medium text-yellow-300 tracking-widest uppercase">Mobile Apps</span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        Beautiful Apps, <span className="gradient-text">Intelligent Experiences</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Native iOS and Android apps with AI-powered features, offline sync, and seamless cloud integration.
                    </p>
                </motion.div>

                {/* Phone Showcase */}
                <div
                    className="flex items-end justify-center gap-6 mb-20 perspective-[1000px]"
                    style={{ minHeight: "460px" }}
                >
                    {appScreens.map((screen, i) => (
                        <PhoneMockup
                            key={i}
                            screenIndex={i}
                            screenData={screen}
                            offsetX={[0, 0, 0][i]}
                            delay={0.2 + i * 0.15}
                        />
                    ))}
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap justify-center gap-4">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.label}
                            className="flex items-center gap-2.5 px-5 py-3 glass border border-white/8 rounded-full hover-target hover:border-purple-500/40 transition-colors duration-300 group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <feat.icon className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{feat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
