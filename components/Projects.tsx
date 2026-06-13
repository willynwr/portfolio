"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./animations";
import { projects } from "@/data/projects";

const filters = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "AI", value: "ai" },
  { label: "IoT", value: "iot" },
  { label: "System", value: "system" },
];

const catIcon: Record<string, string> = { web: "🌐", ai: "🤖", iot: "📡", system: "⚙️" };

function ProjectCard({ project, index, inView }: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-5 flex flex-col gap-3 hover:border-[#2a2a2a] transition-colors"
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span className="text-xl mt-0.5 shrink-0">{catIcon[project.category]}</span>
          <div>
            <h3 className="text-[#f0f0f0] font-semibold text-sm leading-snug">{project.name}</h3>
            <span className="text-[#505050] text-[10px] uppercase tracking-wider">{project.category}</span>
          </div>
        </div>
        {project.featured && (
          <span className="text-[10px] text-[#4f8ef7] border border-[#4f8ef7]/25 px-1.5 py-0.5 rounded shrink-0">
            Featured
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-2">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="text-[#404040] hover:text-[#b0b0b0] transition-colors" aria-label="GitHub">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="text-[#404040] hover:text-[#4f8ef7] transition-colors" aria-label="Live">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-[#707070] text-xs leading-relaxed flex-grow">{project.description}</p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#1a1a1a]">
        {project.stack.slice(0, 5).map((tech) => (
          <span key={tech} className="text-[10px] text-[#606060] bg-[#1a1a1a] border border-[#222] px-2 py-0.5 rounded">
            {tech}
          </span>
        ))}
        {project.stack.length > 5 && (
          <span className="text-[10px] text-[#404040]">+{project.stack.length - 5}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="bg-[#0d0d0d] border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-24 sm:py-32" ref={ref}>
        <SectionLabel num="04" label="Projects" />

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] tracking-tight"
          >
            Things I&apos;ve built
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-1.5"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  active === f.value
                    ? "bg-[#4f8ef7]/10 border-[#4f8ef7]/40 text-[#4f8ef7]"
                    : "border-[#222] text-[#606060] hover:text-[#b0b0b0] hover:border-[#333]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
