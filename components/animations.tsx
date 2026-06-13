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
