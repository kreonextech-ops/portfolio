"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "AI Studio", href: "#automation" },
    { label: "Tech Stack", href: "#tech" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsub = scrollY.on("change", v => setScrolled(v > 60));
        return () => unsub();
    }, [scrollY]);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div
                className={`mx-4 mt-4 rounded-2xl px-6 py-3.5 flex items-center justify-between transition-all duration-500 ${scrolled
                        ? "glass-strong border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                        : "bg-transparent border border-transparent"
                    }`}
            >
                {/* Logo */}
                <a href="#" className="hover-target flex items-center gap-2.5 group">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
                    >
                        <span className="text-white font-display font-bold text-sm">K</span>
                    </div>
                    <span className="font-display font-semibold text-white text-base tracking-tight">Kreonex</span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hover-target text-sm text-white/50 hover:text-white transition-colors duration-200 font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA + Mobile toggle */}
                <div className="flex items-center gap-4">
                    <a
                        href="#contact"
                        className="hover-target hidden md:flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))",
                            border: "1px solid rgba(139,92,246,0.4)",
                        }}
                    >
                        Start Project
                    </a>
                    <button
                        className="md:hidden hover-target p-2 text-white/50 hover:text-white"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <motion.div
                    className="mx-4 mt-2 glass-strong border border-white/10 rounded-2xl p-6 md:hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex flex-col gap-4">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-white/60 hover:text-white text-sm font-medium transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
