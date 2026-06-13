"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel, SectionBg } from "./animations";

const info = [
  { label: "Location", value: "Surabaya, Indonesia" },
  { label: "University", value: "PENS — ITS Campus" },
  { label: "Role", value: "Software Engineer @ Telkomsel" },
  { label: "Email", value: "wildanwhat@gmail.com" },
  { label: "Status", value: "Open to opportunities ✦" },
];

const stats = [
  { n: "3.50", sub: "/4.00", label: "GPA" },
  { n: "8+", sub: "", label: "Projects" },
  { n: "2+", sub: "yrs", label: "Exp." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="about" className="relative bg-[#0d0d0d] border-t border-[#1c1c1c] overflow-hidden">
      <SectionBg orb="blue" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-24 sm:py-32" ref={ref}>
        <SectionLabel num="01" label="About" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] tracking-tight leading-snug mb-6">
              I build software that{" "}
              <span className="text-[#4f8ef7]">scales</span> and{" "}
              <span className="text-[#4f8ef7]">ships.</span>
            </h2>

            <div className="space-y-4 text-[#909090] text-sm sm:text-[15px] leading-relaxed">
              <p>
                I&apos;m an Internet Engineering Technology student at{" "}
                <span className="text-[#d0d0d0] font-medium">PENS</span> (GPA 3.50/4.00),
                currently working as a Software Engineer at{" "}
                <span className="text-[#d0d0d0] font-medium">Telkomsel</span> — Indonesia&apos;s
                largest telecom company.
              </p>
              <p>
                My work spans full-stack development, cloud infrastructure, and intelligent
                systems — from loyalty platforms handling millions of users, to real-time facial
                recognition APIs, to IoT soil monitoring with ML explainability.
              </p>
              <p>
                I care about clean architecture, developer experience, and shipping things
                that actually work in production — not just demos.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {["Full-Stack Dev", "Cloud & DevOps", "AI / ML", "IoT", "System Design"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-md bg-[#141414] border border-[#252525] text-[#909090] text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#141414] border border-[#222] rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-[#f0f0f0] leading-none mb-1">
                    {s.n}
                    <span className="text-[#4f8ef7] text-base">{s.sub}</span>
                  </div>
                  <div className="text-[#606060] text-[11px] uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Info table */}
            <div className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden">
              {info.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex justify-between items-center px-4 py-3 gap-4 ${
                    i < info.length - 1 ? "border-b border-[#1c1c1c]" : ""
                  }`}
                >
                  <span className="text-[#606060] text-xs shrink-0">{item.label}</span>
                  <span className="text-[#b0b0b0] text-xs text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
