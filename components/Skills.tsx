"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./animations";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="skills" className="bg-[#0d0d0d] border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-24 sm:py-32" ref={ref}>
        <SectionLabel num="02" label="Skills" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] tracking-tight mb-12"
        >
          Tech I work with
        </motion.h2>

        <div className="space-y-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 + ci * 0.08 }}
              className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8"
            >
              {/* Category label — fixed width */}
              <div className="sm:w-40 shrink-0 flex items-center gap-2 sm:pt-1">
                <span className="text-base leading-none">{cat.icon}</span>
                <span className="text-[#606060] text-xs font-medium tracking-wide uppercase">
                  {cat.name}
                </span>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 + ci * 0.06 + si * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#252525] text-[#a0a0a0] text-xs font-medium cursor-default hover:text-[#f0f0f0] hover:border-[#4f8ef7]/40 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
