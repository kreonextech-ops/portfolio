import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "Inter", "sans-serif"],
                display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
            },
            colors: {
                neon: {
                    purple: "#8b5cf6",
                    blue: "#3b82f6",
                    cyan: "#06b6d4",
                    pink: "#ec4899",
                },
                glass: {
                    white: "rgba(255,255,255,0.03)",
                    border: "rgba(255,255,255,0.08)",
                },
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "float-slow": "float-slow 8s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "neon-pulse": "neon-pulse 2s ease-in-out infinite",
                "spin-slow": "spin 20s linear infinite",
                "marquee": "marquee 25s linear infinite",
                "terminal-blink": "blink 1s step-end infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "33%": { transform: "translateY(-12px) rotate(1deg)" },
                    "66%": { transform: "translateY(-6px) rotate(-1deg)" },
                },
                "float-slow": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
                    "50%": { opacity: "1", transform: "scale(1.05)" },
                },
                "neon-pulse": {
                    "0%, 100%": { boxShadow: "0 0 5px #8b5cf6, 0 0 10px #8b5cf6, 0 0 20px #8b5cf6" },
                    "50%": { boxShadow: "0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 40px #3b82f6" },
                },
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "mesh-gradient": "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
            },
            boxShadow: {
                "glow-purple": "0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.2)",
                "glow-blue": "0 0 30px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.2)",
                "glow-cyan": "0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2)",
                "inner-glow": "inset 0 0 30px rgba(139,92,246,0.1)",
            },
            transitionTimingFunction: {
                spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            },
        },
    },
    plugins: [],
};
export default config;
