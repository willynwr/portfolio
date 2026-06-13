"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionLabel, SectionBg } from "./animations";
import { experiences } from "@/data/experience";

const typeStyle: Record<string, { pill: string; dot: string }> = {
  "full-time": { pill: "text-[#4f8ef7] border-[#4f8ef7]/30 bg-[#4f8ef7]/8", dot: "border-[#4f8ef7] bg-[#4f8ef7]/20" },
  freelance: { pill: "text-purple-400 border-purple-400/30 bg-purple-400/8", dot: "border-purple-400 bg-purple-400/20" },
  internship: { pill: "text-emerald-400 border-emerald-400/30 bg-emerald-400/8", dot: "border-emerald-400 bg-emerald-400/20" },
};
const typeLabel: Record<string, string> = {
  "full-time": "Full-time",
  freelance: "Freelance",
  internship: "Internship",
};

function ExpCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const style = typeStyle[exp.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="relative pl-8"
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 350, delay: index * 0.08 + 0.1 }}
        className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 ${style.dot}`}
        style={{ left: "-6px" }}
      />

      <div className="pb-10">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-x-4 gap-y-1.5 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[#f0f0f0] font-semibold text-base leading-tight">{exp.title}</h3>
            <p className="text-[#4f8ef7] text-sm mt-0.5">{exp.company}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${style.pill}`}>
              {typeLabel[exp.type]}
            </span>
            <span className="text-[#555] text-xs font-mono">{exp.period}</span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2">
          {exp.highlights.map((h, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 + 0.18 + j * 0.06 }}
              className="flex items-start gap-2.5 text-[#808080] text-sm leading-relaxed"
            >
              <span className="text-[#333] mt-[6px] shrink-0 text-[8px]">◆</span>
              <span>{h}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(headRef, { once: true });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  return (
    <section id="experience" className="relative bg-[#0d0d0d] border-t border-[#1c1c1c] overflow-hidden" ref={sectionRef}>
      <SectionBg orb="teal" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-24 sm:py-32">
        <SectionLabel num="03" label="Experience" />

        <motion.h2
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] tracking-tight mb-14"
        >
          Where I&apos;ve worked
        </motion.h2>

        {/* Timeline */}
        <div className="relative ml-1.5 border-l border-[#1c1c1c]">
          {/* Animated blue fill */}
          <motion.div
            className="absolute top-0 left-0 w-px origin-top bg-gradient-to-b from-[#4f8ef7] to-[#4f8ef7]/20"
            style={{ height: lineH }}
          />
          <div className="mt-1">
            {experiences.map((exp, i) => (
              <ExpCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
