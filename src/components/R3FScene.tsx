"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// ── Floating glowing orb ──────────────────────────────────────────
function GlowOrb({
    position,
    color,
    size,
    speed,
    distort,
}: {
    position: [number, number, number];
    color: string;
    size: number;
    speed: number;
    distort: number;
}) {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.getElapsedTime() * speed * 0.3;
            mesh.current.rotation.y = state.clock.getElapsedTime() * speed * 0.5;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
            <Sphere ref={mesh} args={[size, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={2}
                    roughness={0}
                    metalness={0.1}
                    transparent
                    opacity={0.55}
                />
            </Sphere>
            {/* Point light to cast glow */}
            <pointLight color={color} intensity={1.5} distance={4} decay={2} />
        </Float>
    );
}

// ── Animated particle field ───────────────────────────────────────
function ParticleField() {
    const points = useRef<THREE.Points>(null!);
    const COUNT = 600;

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(COUNT * 3);
        const col = new Float32Array(COUNT * 3);
        const palette = [
            new THREE.Color("#8b5cf6"),
            new THREE.Color("#3b82f6"),
            new THREE.Color("#06b6d4"),
            new THREE.Color("#ec4899"),
            new THREE.Color("#a78bfa"),
        ];
        for (let i = 0; i < COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 22;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return [pos, col];
    }, []);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.getElapsedTime() * 0.025;
            points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.015) * 0.08;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={COUNT}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                    count={COUNT}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.055}
                vertexColors
                transparent
                opacity={0.75}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

// ── Connection lines between nodes ────────────────────────────────
function ConnectionLines() {
    const ref = useRef<THREE.LineSegments>(null!);

    const { positions } = useMemo(() => {
        const nodes: [number, number, number][] = [
            [0, 0, 0], [-3, 1.5, -1], [3, -1, -1], [-2, -2, 1],
            [2, 2.5, 0.5], [-4, 0, 0], [4, 1, -2], [0, -3, 0],
        ];
        const linePositions: number[] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const [ax, ay, az] = nodes[i];
                const [bx, by, bz] = nodes[j];
                const dist = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2 + (bz - az) ** 2);
                if (dist < 5) {
                    linePositions.push(ax, ay, az, bx, by, bz);
                }
            }
        }
        return { positions: new Float32Array(linePositions) };
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.06;
            ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.04) * 0.1;
        }
    });

    return (
        <lineSegments ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
        </lineSegments>
    );
}

// ── Mouse-reactive camera rig ─────────────────────────────────────
function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    useFrame((state) => {
        state.camera.position.x += (mouseX * 1.5 - state.camera.position.x) * 0.04;
        state.camera.position.y += (-mouseY * 1.0 - state.camera.position.y) * 0.04;
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

// ── Main exported component ───────────────────────────────────────
export default function R3FScene({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 55 }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.15} />
            <CameraRig mouseX={mouseX} mouseY={mouseY} />

            {/* Galaxy of particles */}
            <ParticleField />

            {/* Animated node graph */}
            <ConnectionLines />

            {/* Floating glowing orbs */}
            <GlowOrb position={[-3.5, 1.5, -2]} color="#8b5cf6" size={1.1} speed={0.8} distort={0.45} />
            <GlowOrb position={[3.5, -1, -3]} color="#3b82f6" size={0.85} speed={0.6} distort={0.35} />
            <GlowOrb position={[0.5, 2.8, -4]} color="#06b6d4" size={0.65} speed={1.1} distort={0.55} />
            <GlowOrb position={[-1.5, -2.5, -1]} color="#ec4899" size={0.5} speed={0.9} distort={0.4} />

            {/* Deep-space background stars */}
            <Stars radius={60} depth={50} count={2500} factor={3} saturation={0.3} fade speed={0.5} />
        </Canvas>
    );
}
