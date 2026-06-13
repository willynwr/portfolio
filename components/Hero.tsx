"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HangingIdCard } from "@/components/lightswind/HangingIdCard";

const roles = ["Software Engineer", "Full-Stack Developer", "IoT Developer", "AI Engineer"];

function useTyping(strings: string[], speed = 70, pause = 2400) {
  const [display, setDisplay] = useState("");
  const [del, setDel] = useState(false);
  const [idx, setIdx] = useState(0);
  const [ci, setCi] = useState(0);
  useEffect(() => {
    const cur = strings[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && ci < cur.length) t = setTimeout(() => { setDisplay(cur.slice(0, ci + 1)); setCi(c => c + 1); }, speed);
    else if (!del && ci === cur.length) t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0) t = setTimeout(() => { setDisplay(cur.slice(0, ci - 1)); setCi(c => c - 1); }, speed / 2.5);
    else { setDel(false); setIdx(i => (i + 1) % strings.length); }
    return () => clearTimeout(t);
  }, [ci, del, idx, strings, speed, pause]);
  return display;
}

export default function Hero() {
  const typed = useTyping(roles);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.45 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,142,247,${p.a})`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(79,142,247,${0.08 * (1 - d / 115)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#0d0d0d] overflow-hidden">

      {/* ── Layer 1: Dot-grid ───────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Layer 2: Aurora orb — top-left blue (CSS) ───────── */}
      <div
        className="orb-a absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "-10%",
          width: "65vw",
          height: "65vw",
          background: "radial-gradient(ellipse at center, rgba(79,142,247,0.13) 0%, rgba(79,142,247,0.04) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      {/* ── Layer 3: Aurora orb — bottom-right indigo (CSS) ─── */}
      <div
        className="orb-b-delayed absolute pointer-events-none"
        style={{
          bottom: "-25%",
          right: "-15%",
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.05) 45%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
        }}
      />

      {/* ── Layer 4: Aurora orb — mid teal (CSS) ────────────── */}
      <div
        className="orb-a-delayed absolute pointer-events-none"
        style={{
          top: "30%",
          right: "20%",
          width: "35vw",
          height: "35vw",
          background: "radial-gradient(ellipse at center, rgba(20,184,166,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      {/* ── Layer 5: Particle canvas ─────────────────────────── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* ── Layer 6: Vignette overlay ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13,13,13,0) 0%, rgba(13,13,13,0.5) 100%),
            radial-gradient(ellipse 100% 40% at 50% 100%, rgba(13,13,13,0.7) 0%, transparent 100%)
          `,
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-36 sm:py-44">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* ── Left: text ────────────────────────────────────── */}
          <div className="max-w-2xl">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2.5 mb-10 text-xs text-[#707070] tracking-widest uppercase"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              Available for work · Surabaya, Indonesia
            </motion.div>

            {/* Big name */}
            <div className="mb-2 overflow-hidden">
              <motion.h1
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(52px,10vw,100px)] font-extrabold text-[#f0f0f0] leading-none tracking-[-0.03em]"
              >
                Wildan
              </motion.h1>
            </div>
            <div className="mb-8 overflow-hidden">
              <motion.h1
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
                className="text-[clamp(52px,10vw,100px)] font-extrabold leading-none tracking-[-0.03em]"
                style={{ color: "transparent", WebkitTextStroke: "1.5px #2a2a2a" }}
              >
                Anwar.
              </motion.h1>
            </div>

            {/* Typed role */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="text-[#4f8ef7] text-sm font-mono">~/</span>
              <span className="text-[#b0b0b0] text-sm sm:text-base font-mono min-h-[1.5em]">
                {typed}
                <span className="text-[#4f8ef7] animate-pulse ml-px">▋</span>
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="text-[#707070] text-sm sm:text-base max-w-lg leading-relaxed mb-10"
            >
              Building scalable web apps, AI-powered systems &amp; IoT solutions.
              Currently Software Engineer at{" "}
              <span className="text-[#b0b0b0]">Telkomsel</span>, student at{" "}
              <span className="text-[#b0b0b0]">PENS</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.72 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 bg-[#f0f0f0] text-[#0d0d0d] text-sm font-semibold rounded-lg hover:bg-white hover:scale-[1.02] transition-all duration-200"
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 border border-[#333] text-[#b0b0b0] text-sm font-medium rounded-lg hover:border-[#4f8ef7]/60 hover:text-[#f0f0f0] hover:scale-[1.02] transition-all duration-200"
              >
                Get in Touch
              </button>
              <div className="flex items-center gap-3 pl-1">
                <a href="https://github.com/willynwr" target="_blank" rel="noopener noreferrer" className="text-[#404040] hover:text-[#b0b0b0] transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/wildan-anwar-03422a329" target="_blank" rel="noopener noreferrer" className="text-[#404040] hover:text-[#b0b0b0] transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Hanging ID Card ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-center items-start pt-16"
          >
            <HangingIdCard
              ropeColor="#2a2a2a"
              accentColor="#4f8ef7"
              ropeLength={110}
              name="Wildan Anwar"
              role="Software Engineer"
              badgeId="PENS-2025"
            >
              {/* Custom dark-themed card body */}
              <div className="flex flex-col h-full">
                {/* Header — full-width photo */}
                <div className="relative w-full overflow-hidden" style={{ height: "140px" }}>
                  <img
                    src="/foto.jpg"
                    alt="Wildan Anwar"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 20%" }}
                  />
                  {/* Gradient fade into card body */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-10"
                    style={{ background: "linear-gradient(to bottom, transparent, #111111)" }}
                  />
                </div>

                {/* Card body */}
                <div className="bg-[#111111] px-4 py-4 flex flex-col items-center gap-2 flex-1 border-t border-[#222]">
                  <p className="text-sm font-bold text-[#f0f0f0] text-center leading-tight">
                    Wildan Anwar
                  </p>
                  <p className="text-[11px] text-[#4f8ef7] font-medium">
                    Software Engineer
                  </p>

                  <div className="my-1.5 w-full border-t border-[#222]" />

                  {/* Info rows */}
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#555]">University</span>
                      <span className="text-[#b0b0b0]">PENS</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#555]">Location</span>
                      <span className="text-[#b0b0b0]">Surabaya, ID</span>
                    </div>
                  </div>

                  <div className="my-1 w-full border-t border-[#222]" />

                  {/* Barcode */}
                  <div className="flex gap-[2px] items-end h-6 px-1">
                    {Array.from({ length: 26 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-[1px]"
                        style={{
                          background: "#4f8ef7",
                          width: i % 3 === 0 ? "3px" : "1.5px",
                          height: `${50 + Math.sin(i * 1.3) * 35}%`,
                          opacity: 0.6 + (i % 3) * 0.15,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-mono font-bold tracking-widest text-[#4f8ef7]/80">
                    PENS-2025
                  </p>

                  {/* Status */}
                  <div className="mt-0.5 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white" style={{ background: "rgba(79,142,247,0.2)", border: "1px solid rgba(79,142,247,0.4)", color: "#4f8ef7" }}>
                    AVAILABLE
                  </div>
                </div>
              </div>
            </HangingIdCard>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-6 sm:left-14 lg:left-20 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#333] to-transparent"
        />
        <span className="text-[#404040] text-[10px] tracking-widest uppercase rotate-90 origin-left translate-y-4">scroll</span>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />
    </section>
  );
}
