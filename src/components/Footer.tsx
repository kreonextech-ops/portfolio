"use client";

import { motion } from "framer-motion";
import { Bot, Twitter, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const footerLinks = {
    Services: ["AI Systems", "CRM & ERP", "Mobile Apps", "SaaS Development", "AI Automation", "SMM Solutions"],
    Company: ["About Us", "Case Studies", "Blog", "Careers", "Contact"],
    Technology: ["Next.js", "LangGraph", "Supabase", "React Native", "AWS"],
};

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-sm" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2.5 mb-6">
                            <Image
                                src="/logo.png"
                                alt="Kreonex"
                                width={36}
                                height={36}
                                className="rounded-xl"
                            />
                            <span className="font-display font-semibold text-lg" style={{ color: "var(--foreground)" }}>
                                Kreonex
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                            Advanced AI engineering studio building the intelligent digital infrastructure of tomorrow.
                        </p>

                        {/* Contact details */}
                        <div className="space-y-2 mb-6">
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" />
                                <span className="text-sm" style={{ color: "var(--muted)" }}>
                                    Bagdogra, Siliguri, West Bengal
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0 text-purple-400" />
                                <a
                                    href="tel:+916296102605"
                                    className="hover-target text-sm hover:text-purple-400 transition-colors"
                                    style={{ color: "var(--muted)" }}
                                >
                                    +91 6296102605
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="hover-target w-9 h-9 glass border border-white/8 rounded-xl flex items-center justify-center hover:border-purple-500/40 transition-all duration-200"
                                    style={{ color: "var(--muted)" }}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-5" style={{ color: "var(--muted)" }}>{category}</h4>
                            <ul className="space-y-3">
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="hover-target text-sm hover:text-purple-400 transition-colors duration-200" style={{ color: "var(--muted)" }}>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
                        <Bot className="w-4 h-4 text-purple-500/50" />
                        <span>© 2025 Kreonex Technologies. All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
                            <a key={item} href="#" className="hover-target text-xs hover:text-purple-400 transition-colors" style={{ color: "var(--muted)" }}>
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
