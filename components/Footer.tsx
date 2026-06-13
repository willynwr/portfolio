"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#404040] text-xs font-mono">
            wildan<span className="text-[#4f8ef7]/60">.</span>dev
          </span>
          <p className="text-[#404040] text-xs text-center">
            © {new Date().getFullYear()} Wildan Anwar
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "GitHub", href: "https://github.com/willynwr" },
              { label: "LinkedIn", href: "https://linkedin.com/in/wildan-anwar-03422a329" },
              { label: "Email", href: "mailto:wildanwhat@gmail.com" },
            ].map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="text-[#404040] hover:text-[#b0b0b0] text-xs transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
