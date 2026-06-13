"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./animations";
import { certifications } from "@/data/certifications";

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="certifications" className="bg-[#0d0d0d] border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-24 sm:py-32" ref={ref}>
        <SectionLabel num="05" label="Certifications" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] tracking-tight mb-10"
        >
          Credentials
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.055 }}
              whileHover={{ y: -3, borderColor: "#2a2a2a" }}
              className="flex items-start gap-3.5 p-4 bg-[#141414] border border-[#1e1e1e] rounded-xl group cursor-default"
            >
              <span className="text-xl shrink-0 mt-0.5 grayscale group-hover:grayscale-0 transition-all duration-300">
                {cert.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[#d0d0d0] text-xs font-medium leading-snug mb-1 group-hover:text-[#f0f0f0] transition-colors">
                  {cert.name}
                </p>
                <p className="text-[#555] text-[11px]">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
