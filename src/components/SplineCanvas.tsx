"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    size: number;
    color: string;
    opacity: number;
    originalX: number;
    originalY: number;
}

export default function SplineCanvas({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            init();
        };

        const colors = [
            "rgba(139,92,246,", // purple
            "rgba(59,130,246,", // blue
            "rgba(236,72,153,", // pink
            "rgba(6,182,212,",  // cyan
            "rgba(167,139,250,", // violet
        ];

        function init() {
            const count = Math.floor((canvas!.width * canvas!.height) / 8000);
            particlesRef.current = Array.from({ length: Math.max(80, Math.min(count, 200)) }, () => {
                const x = Math.random() * canvas!.width;
                const y = Math.random() * canvas!.height;
                return {
                    x, y,
                    z: Math.random() * 2 + 0.5,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    vz: 0,
                    size: Math.random() * 2.5 + 0.8,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: Math.random() * 0.5 + 0.15,
                    originalX: x,
                    originalY: y,
                };
            });
        }

        function drawConnections(particles: Particle[]) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i], p2 = particles[j];
                    const dx = p1.x - p2.x, dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const alpha = (1 - dist / 120) * 0.15 * Math.min(p1.opacity, p2.opacity) * 4;
                        ctx!.beginPath();
                        ctx!.strokeStyle = `rgba(139,92,246,${alpha})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.moveTo(p1.x, p1.y);
                        ctx!.lineTo(p2.x, p2.y);
                        ctx!.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!canvas || !ctx) return;
            timeRef.current += 0.008;
            const t = timeRef.current;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Floating orbs
            const orbs = [
                { cx: canvas.width * 0.25, cy: canvas.height * 0.35, r: 200, color: "rgba(139,92,246," },
                { cx: canvas.width * 0.75, cy: canvas.height * 0.60, r: 160, color: "rgba(59,130,246," },
                { cx: canvas.width * 0.55, cy: canvas.height * 0.25, r: 120, color: "rgba(6,182,212," },
            ];

            orbs.forEach((orb, i) => {
                const ox = Math.sin(t * 0.6 + i * 2) * 30;
                const oy = Math.cos(t * 0.4 + i) * 20;
                const grad = ctx.createRadialGradient(
                    orb.cx + ox, orb.cy + oy, 0,
                    orb.cx + ox, orb.cy + oy, orb.r
                );
                grad.addColorStop(0, `${orb.color}0.12)`);
                grad.addColorStop(0.5, `${orb.color}0.05)`);
                grad.addColorStop(1, `${orb.color}0)`);
                ctx.beginPath();
                ctx.arc(orb.cx + ox, orb.cy + oy, orb.r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            });

            // Grid lines
            ctx.save();
            ctx.strokeStyle = "rgba(139,92,246,0.04)";
            ctx.lineWidth = 0.5;
            const gridSize = 60;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
            ctx.restore();

            // Update + draw particles
            const particles = particlesRef.current;
            particles.forEach((p) => {
                // Gentle wave
                p.x += p.vx + Math.sin(t + p.originalY * 0.01) * 0.1;
                p.y += p.vy + Math.cos(t * 0.7 + p.originalX * 0.01) * 0.1;

                // Wrap around
                if (p.x < -10) p.x = canvas!.width + 10;
                if (p.x > canvas!.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas!.height + 10;
                if (p.y > canvas!.height + 10) p.y = -10;

                // Pulse opacity
                const pulsedOpacity = p.opacity * (0.7 + Math.sin(t * 1.5 + p.originalX) * 0.3);

                // Draw particle
                const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * p.z * 4);
                grad.addColorStop(0, `${p.color}${pulsedOpacity})`);
                grad.addColorStop(1, `${p.color}0)`);
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size * p.z * 4, 0, Math.PI * 2);
                ctx!.fillStyle = grad;
                ctx!.fill();
            });

            // Draw connection lines
            drawConnections(particles);

            animFrameRef.current = requestAnimationFrame(animate);
        }

        resize();
        window.addEventListener("resize", resize);
        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.9 }}
        />
    );
}
