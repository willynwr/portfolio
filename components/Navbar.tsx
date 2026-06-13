"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "";
      for (const l of navLinks) {
        const el = document.getElementById(l.href.substring(1));
        if (el && window.scrollY >= el.offsetTop - 130) cur = l.href.substring(1);
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.getElementById(href.substring(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#0d0d0d]/85 backdrop-blur-xl border-b border-[#222]" : ""
    }`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-14 lg:px-20">
        <div className="flex items-center justify-between h-[58px]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold text-[#f0f0f0] hover:text-[#4f8ef7] transition-colors tracking-tight"
          >
            wildan<span className="text-[#4f8ef7]">.</span>dev
          </motion.button>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => go(l.href)}
                className={`text-sm relative transition-colors duration-200 ${
                  active === l.href.substring(1)
                    ? "text-[#f0f0f0]"
                    : "text-[#707070] hover:text-[#b0b0b0]"
                }`}
              >
                {l.label}
                {active === l.href.substring(1) && (
                  <motion.span
                    layoutId="navDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4f8ef7]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              href="mailto:wildanwhat@gmail.com"
              className="text-xs px-4 py-1.5 border border-[#333] text-[#b0b0b0] hover:text-[#f0f0f0] hover:border-[#4f8ef7]/50 rounded-lg transition-all duration-200"
            >
              Hire me ↗
            </motion.a>
          </nav>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setOpen(!open)}
          >
            <span className={`block w-5 h-px bg-[#b0b0b0] transition-all origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-px bg-[#b0b0b0] transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-[#b0b0b0] transition-all origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden bg-[#0d0d0d] border-b border-[#222]"
          >
            <div className="px-6 sm:px-14 lg:px-20 py-3 space-y-1">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className={`block w-full text-left py-2.5 text-sm transition-colors ${
                    active === l.href.substring(1) ? "text-[#f0f0f0]" : "text-[#707070] hover:text-[#b0b0b0]"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
