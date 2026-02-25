"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

const links = [
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "AI Studio", href: "#automation" },
    { label: "Tech Stack", href: "#tech" },
    { label: "Contact", href: "#contact" },
];

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-9 h-9" />;

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="hover-target relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
                background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.07)",
                border: isDark
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.1)",
            }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.span
                        key="moon"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="w-4 h-4 text-purple-400" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="sun"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="w-4 h-4 text-amber-500" />
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}

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
                    ? "shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
                    : "border border-transparent bg-transparent"
                    }`}
                style={scrolled ? {
                    background: "var(--glass-strong-bg)",
                    border: "1px solid var(--glass-strong-border)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                } : {}}
            >
                {/* Logo */}
                <a href="#" className="hover-target flex items-center gap-2.5 group">
                    <Image
                        src="/logo.png"
                        alt="Kreonex"
                        width={32}
                        height={32}
                        className="rounded-lg"
                    />
                    <span
                        className="font-display font-semibold text-base tracking-tight"
                        style={{ color: "var(--foreground)" }}
                    >
                        Kreonex
                    </span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hover-target text-sm font-medium transition-colors duration-200"
                            style={{ color: "var(--muted)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA + Theme toggle + Mobile */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <a
                        href="https://www.kreonex.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-target hidden md:flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))",
                            border: "1px solid rgba(139,92,246,0.4)",
                        }}
                    >
                        Start Project
                    </a>
                    <button
                        className="md:hidden hover-target p-2 transition-colors"
                        style={{ color: "var(--muted)" }}
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
                    className="mx-4 mt-2 rounded-2xl p-6 md:hidden"
                    style={{
                        background: "var(--glass-strong-bg)",
                        border: "1px solid var(--glass-strong-border)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex flex-col gap-4">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium transition-colors"
                                style={{ color: "var(--muted)" }}
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
