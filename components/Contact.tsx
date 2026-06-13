"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./animations";

const contactLinks = [
  { label: "wildanwhat@gmail.com", href: "mailto:wildanwhat@gmail.com" },
  { label: "+62 881 4370 080", href: "tel:+628814370080" },
  { label: "github.com/willynwr", href: "https://github.com/willynwr" },
  { label: "linkedin.com/in/wildan-anwar", href: "https://linkedin.com/in/wildan-anwar-03422a329" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="bg-[#0d0d0d] border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6 sm:px-14 lg:px-20 py-24 sm:py-32" ref={ref}>
        <SectionLabel num="06" label="Contact" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
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

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#606060] text-xs mb-1.5">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-[#141414] border border-[#252525] focus:border-[#4f8ef7]/50 rounded-lg px-3.5 py-2.5 text-[#f0f0f0] text-sm placeholder:text-[#3a3a3a] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#606060] text-xs mb-1.5">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-[#141414] border border-[#252525] focus:border-[#4f8ef7]/50 rounded-lg px-3.5 py-2.5 text-[#f0f0f0] text-sm placeholder:text-[#3a3a3a] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#606060] text-xs mb-1.5">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What's on your mind..."
                  className="w-full bg-[#141414] border border-[#252525] focus:border-[#4f8ef7]/50 rounded-lg px-3.5 py-2.5 text-[#f0f0f0] text-sm placeholder:text-[#3a3a3a] outline-none transition-colors resize-none"
                />
              </div>

              <motion.button
                id="contact-submit"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  sent
                    ? "bg-green-500/15 border border-green-500/30 text-green-400"
                    : "bg-[#f0f0f0] text-[#0d0d0d] hover:bg-white"
                }`}
              >
                {sent ? "✓ Message Sent!" : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
