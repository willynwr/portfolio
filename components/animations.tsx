"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SectionLabel({ num, label }: { num: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-12"
    >
      <span className="text-[#3a3a3a] text-xs font-mono">{num}</span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="h-px w-10 bg-[#4f8ef7]/60 origin-left"
      />
      <span className="text-[#606060] text-xs tracking-widest uppercase">{label}</span>
    </motion.div>
  );
}

/**
 * Shared decorative background for every section below the Hero.
 * Uses plain divs + CSS keyframe classes (GPU-accelerated, zero JS overhead).
 *
 * Usage:
 *   <section className="relative bg-[#0d0d0d] overflow-hidden ...">
 *     <SectionBg orb="blue" />
 *     <div className="relative z-10 ...">...</div>
 *   </section>
 */
export function SectionBg({
  orb = "blue",
}: {
  orb?: "blue" | "indigo" | "teal" | "purple";
}) {
  const orbColors: Record<string, { primary: string; secondary: string }> = {
    blue:   { primary: "rgba(79,142,247,0.10)",  secondary: "rgba(79,142,247,0.04)" },
    indigo: { primary: "rgba(99,102,241,0.09)",  secondary: "rgba(139,92,246,0.04)" },
    teal:   { primary: "rgba(20,184,166,0.08)",  secondary: "rgba(79,142,247,0.04)" },
    purple: { primary: "rgba(168,85,247,0.08)",  secondary: "rgba(99,102,241,0.04)" },
  };
  const { primary, secondary } = orbColors[orb];

  return (
    <>
      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Primary orb — top-right — CSS animated */}
      <div
        className="orb-a absolute pointer-events-none select-none"
        style={{
          top: "-30%",
          right: "-15%",
          width: "60vw",
          height: "60vw",
          background: `radial-gradient(ellipse at center, ${primary} 0%, ${secondary} 40%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(56px)",
        }}
      />

      {/* Secondary orb — bottom-left — CSS animated */}
      <div
        className="orb-b absolute pointer-events-none select-none"
        style={{
          bottom: "-30%",
          left: "-20%",
          width: "45vw",
          height: "45vw",
          background: `radial-gradient(ellipse at center, ${secondary} 0%, transparent 65%)`,
          borderRadius: "50%",
          filter: "blur(64px)",
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 30% at 50% 0%,   rgba(13,13,13,0.6) 0%, transparent 100%),
            radial-gradient(ellipse 100% 30% at 50% 100%, rgba(13,13,13,0.6) 0%, transparent 100%)
          `,
        }}
      />
    </>
  );
}
