"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Bot, Maximize2, Minimize2, X, Minus } from "lucide-react";

const terminalLines = [
    { delay: 0, text: "$ kreonex init --project='enterprise-saas'", type: "cmd" },
    { delay: 0.6, text: "> Bootstrapping AI-powered SaaS...", type: "info" },
    { delay: 1.2, text: "> ✓ Next.js 14 App Router configured", type: "success" },
    { delay: 1.8, text: "> ✓ Supabase connected (146ms)", type: "success" },
    { delay: 2.4, text: "> ✓ GPT-4o context injected (8192 tokens)", type: "success" },
    { delay: 3.0, text: "> ✓ CRM pipeline initialized (12 stages)", type: "success" },
    { delay: 3.6, text: "> ✓ WhatsApp API handshake complete", type: "success" },
    { delay: 4.2, text: "> Deploying to edge network (47 regions)...", type: "info" },
    { delay: 5.0, text: "> ✓ All systems operational — kreonex.app live", type: "success" },
    { delay: 5.5, text: "$ _", type: "cursor" },
];

const aiMessages = [
    { role: "user", text: "Can we auto-score leads from our CRM?" },
    { role: "ai", text: "Yes. I'll connect to your CRM, run GPT-4o classification on each lead, and pipe high-intent scores back in real-time.", delay: 0.5 },
    { role: "user", text: "What about WhatsApp follow-ups?" },
    { role: "ai", text: "Done. I'll trigger contextual WhatsApp messages 4 hours after scoring, with personalized content based on the lead's industry and behavior.", delay: 0.5 },
];

function TerminalLine({ line, visible }: { line: typeof terminalLines[0]; visible: boolean }) {
    const [shown, setShown] = useState(false);
    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(() => setShown(true), line.delay * 1000);
        return () => clearTimeout(t);
    }, [visible, line.delay]);

    if (!shown) return null;

    const colors: Record<string, string> = {
        cmd: "#8b5cf6",
        info: "rgba(255,255,255,0.5)",
        success: "#10b981",
        cursor: "#8b5cf6",
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] font-mono leading-relaxed"
            style={{ color: colors[line.type] || "white" }}
        >
            {line.type === "cursor" ? (
                <span>$ <span className="inline-block w-2 h-3 bg-purple-500 align-middle animate-terminal-blink" /></span>
            ) : line.text}
        </motion.div>
    );
}

export default function LabSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [isMaximized, setIsMaximized] = useState(false);
    const [aiTyping, setAiTyping] = useState(false);

    return (
        <section ref={ref} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-purple-950/10 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                        <span className="text-xs font-medium text-pink-300 tracking-widest uppercase">Experimental Lab</span>
                    </div>
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold mb-4">
                        Where <span className="gradient-text">Ideas Become Systems</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Our internal dev environment — live terminal interfaces, AI co-pilots, and real-time system orchestration.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Terminal */}
                    <motion.div
                        className="glass border border-white/8 rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(139,92,246,0.06)" }}
                    >
                        {/* Terminal header */}
                        <div className="glass-strong border-b border-white/5 px-4 py-3 flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                            </div>
                            <div className="flex-1 flex items-center justify-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-white/30" />
                                <span className="text-[11px] text-white/30">kreonex terminal — bash</span>
                            </div>
                        </div>

                        {/* Terminal content */}
                        <div className="p-5 space-y-1 font-mono min-h-[280px] bg-black/40">
                            {terminalLines.map((line, i) => (
                                <TerminalLine key={i} line={line} visible={inView} />
                            ))}
                        </div>
                    </motion.div>

                    {/* AI Sidebar */}
                    <motion.div
                        className="glass border border-white/8 rounded-2xl overflow-hidden flex flex-col"
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(139,92,246,0.06)" }}
                    >
                        {/* AI header */}
                        <div className="glass-strong border-b border-white/5 px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-white font-display">Kreonex AI</div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] text-green-400">Online</span>
                                </div>
                            </div>
                            <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                <span className="text-[10px] text-purple-300">GPT-4o</span>
                            </div>
                        </div>

                        {/* Chat messages */}
                        <div className="flex-1 p-4 space-y-4 overflow-auto" style={{ minHeight: "220px" }}>
                            {aiMessages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1 + i * 0.8 }}
                                >
                                    {msg.role === "ai" && (
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5">
                                            <Bot className="w-3 h-3 text-purple-400" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${msg.role === "user"
                                                ? "bg-purple-500/20 border border-purple-500/30 text-white/80 rounded-tr-sm"
                                                : "bg-white/5 border border-white/8 text-white/60 rounded-tl-sm"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* AI typing indicator */}
                            <motion.div
                                className="flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 4.5 }}
                            >
                                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                                    <Bot className="w-3 h-3 text-purple-400" />
                                </div>
                                <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-3 py-2">
                                    {[0, 0.2, 0.4].map((d) => (
                                        <motion.div
                                            key={d}
                                            className="w-1.5 h-1.5 rounded-full bg-purple-400"
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Chat input */}
                        <div className="border-t border-white/5 p-4">
                            <div className="flex items-center gap-3 glass border border-white/8 rounded-xl px-4 py-3">
                                <span className="text-white/20 text-xs flex-1">Ask anything about your system...</span>
                                <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <Bot className="w-3 h-3 text-purple-400" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
