"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel, SectionBg } from "./animations";

const contactLinks = [
  { label: "wildanwhat@gmail.com", href: "mailto:wildanwhat@gmail.com" },
  { label: "+62 881 4370 080", href: "tel:+628814370080" },
  { label: "github.com/willynwr", href: "https://github.com/willynwr" },
  { label: "linkedin.com/in/wildan-anwar", href: "https://linkedin.com/in/wildan-anwar-03422a329" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="contact" className="relative bg-[#0d0d0d] border-t border-[#1c1c1c] overflow-hidden">
      <SectionBg orb="indigo" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-24 sm:py-32" ref={ref}>
        <SectionLabel num="06" label="Contact" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] tracking-tight leading-tight mb-3">
            Let&apos;s work together.
          </h2>
          <p className="text-[#707070] text-sm leading-relaxed mb-8">
            Have a project, opportunity, or just want to talk tech? My inbox is always open.
          </p>

          <div className="space-y-0">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between py-3.5 border-b border-[#1c1c1c] text-[#808080] hover:text-[#f0f0f0] text-sm transition-colors group"
              >
                <span>{link.label}</span>
                <span className="text-[#404040] group-hover:text-[#4f8ef7] text-xs transition-colors">↗</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
