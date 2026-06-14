"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionLabel, SectionBg } from "./animations";
import { projects } from "@/data/projects";

const catIcon: Record<string, string> = { web: "🌐", ai: "🤖", iot: "📡", system: "⚙️" };
const catColor: Record<string, string> = {
  web: "#4f8ef7",
  ai: "#a78bfa",
  iot: "#34d399",
  system: "#fb923c",
};

// ── 3D Slider Card ────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  position, // -1 = left bg, 0 = center, 1 = right bg, ±2 = hidden
  onClick,
}: {
  project: (typeof projects)[0];
  position: number;
  onClick: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const isCenter = position === 0;
  const isVisible = Math.abs(position) <= 1;

  // Reset image index when card changes position
  useEffect(() => { setImgIdx(0); }, [project.id]);

  // Auto-rotate images when center card has multiple images
  useEffect(() => {
    if (!isCenter || project.images.length <= 1) return;
    const timer = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isCenter, project.images.length]);

  if (!isVisible) return null;

  const CARD_W = 420;
  const xOffset = position * 350;
  const scale = isCenter ? 1 : 0.82;
  const zIndex = isCenter ? 10 : 5;
  const opacity = isCenter ? 1 : 0.45;
  const rotateY = position * -14;
  const blur = isCenter ? 0 : 5;

  return (
    <motion.div
      layout
      animate={{
        x: xOffset,
        scale,
        opacity,
        rotateY,
        filter: `blur(${blur}px)`,
        zIndex,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      onClick={!isCenter ? onClick : undefined}
      className="absolute top-0 cursor-pointer"
      style={{
        width: CARD_W,
        left: `calc(50% - ${CARD_W / 2}px)`,  // centering via style, not Tailwind transform
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
        isCenter
          ? "border-[#1e1e1e] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)]"
          : "border-[#161616]"
      } bg-[#0d0d0d]`}>

        {/* Image area */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0d0d0d] group">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIdx}
              src={project.images[imgIdx]}
              alt={project.name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          </AnimatePresence>



          {/* Category badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm"
            style={{
              background: `${catColor[project.category]}20`,
              border: `1px solid ${catColor[project.category]}40`,
              color: catColor[project.category],
            }}
          >
            <span>{catIcon[project.category]}</span>
            {project.category}
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider text-[#4f8ef7] bg-[#4f8ef7]/10 border border-[#4f8ef7]/30 backdrop-blur-sm uppercase">
              Featured
            </div>
          )}

          {/* Image dots (only if multiple images & center) */}
          {isCenter && project.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === imgIdx ? "18px" : "6px",
                    height: "6px",
                    background: i === imgIdx ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-5 bg-[#0d0d0d]">
          <h3 className="text-[#f0f0f0] font-bold text-base leading-snug mb-1.5">
            {project.name}
          </h3>
          <p className="text-[#666] text-xs leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] text-[#606060] bg-[#161616] border border-[#1e1e1e] px-2 py-0.5 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-[10px] text-[#444]">+{project.stack.length - 4}</span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#1a1a1a]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-[#555] hover:text-[#b0b0b0] text-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-[#4f8ef7] hover:text-[#7fb1ff] text-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


// ── Main Section ──────────────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const total = projects.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  // Touch / drag handlers
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(x);
  };
  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return;
    const x = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = dragStart - x;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    setDragStart(null);
  };

  return (
    <section id="projects" className="relative bg-[#0d0d0d] border-t border-[#1c1c1c] overflow-hidden">
      <SectionBg orb="blue" />
      <div
        className="relative z-10 max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-24 sm:py-32"
        ref={ref}
      >
        {/* ── Section label with line draw ── */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="text-[#4f8ef7] text-xs font-mono tracking-widest">04</span>
          <motion.div
            className="h-px bg-[#4f8ef7]/40"
            initial={{ width: 0 }}
            animate={inView ? { width: 40 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          />
          <motion.span
            className="text-[#404040] text-[10px] tracking-[0.25em] uppercase"
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Projects
          </motion.span>
        </motion.div>

        {/* ── Title word-by-word reveal ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] tracking-tight leading-tight overflow-hidden">
              {"Things I've built".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.65,
                      delay: 0.3 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.p
              className="text-[#505050] text-sm mt-2"
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.span
                className="text-[#4f8ef7] font-mono"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.85 }}
              >
                {current + 1}/{total}
              </motion.span>
              {" "}— drag or use arrows to explore
            </motion.p>
          </div>

          {/* Nav buttons slide in from right */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={prev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-[#141414] text-[#606060] hover:text-[#f0f0f0] hover:border-[#4f8ef7]/40 transition-all flex items-center justify-center"
            >
              ←
            </button>
            <div className="flex gap-1.5">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Project ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "20px" : "6px",
                    height: "6px",
                    background: i === current ? "#4f8ef7" : "#2a2a2a",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-[#141414] text-[#606060] hover:text-[#f0f0f0] hover:border-[#4f8ef7]/40 transition-all flex items-center justify-center"
            >
              →
            </button>
          </motion.div>
        </div>

        {/* ── 3D Slider stage — rises from depth ── */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.92, rotateX: 6 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
        >
          {/* Perspective container */}
          <div
            className="relative mx-auto select-none"
            style={{
              height: "580px",
              perspective: "1200px",
              perspectiveOrigin: "50% 40%",
            }}
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}
          >
            {projects.map((project, i) => {
              let pos = i - current;
              if (pos > total / 2) pos -= total;
              if (pos < -total / 2) pos += total;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  position={pos}
                  onClick={() => setCurrent(i)}
                />
              );
            })}

            {/* Scanning light sweep on entrance */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={inView ? {
                opacity: [0, 0.6, 0],
                background: [
                  "linear-gradient(105deg, transparent 0%, transparent 30%, rgba(79,142,247,0.08) 50%, transparent 70%, transparent 100%)",
                  "linear-gradient(105deg, transparent 0%, transparent 60%, rgba(79,142,247,0.08) 80%, transparent 95%, transparent 100%)",
                  "linear-gradient(105deg, transparent 0%, transparent 100%)",
                ],
              } : {}}
              transition={{ duration: 1.2, delay: 1.0, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
