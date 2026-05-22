"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle,
  MessageSquare,
  Phone,
  ArrowUpRight,
  FileText,
  Clock,
  MapPin,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import GlassCard from "../ui/glass-card";
import MagneticButton from "../ui/magnetic-button";

const CONTACT_CARDS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "srijansk1304@gmail.com",
    sub: "Best for detailed inquiries",
    href: "mailto:srijansk1304@gmail.com",
    color: "#60a5fa",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+91 8019682137",
    sub: "Quick chats & collaborations",
    href: "https://wa.me/918019682137",
    color: "#34d399",
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "srijan-kumar-sk13",
    sub: "Professional connections",
    href: "https://www.linkedin.com/in/srijan-kumar-sk13/",
    color: "#818cf8",
  },
  {
    id: "github",
    icon: FaGithub,
    label: "GitHub",
    value: "srijansk13",
    sub: "Browse open-source work",
    href: "https://github.com/srijansk13",
    color: "#e2e8f0",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { theme, addToast } = usePortfolioStore();
  const accentColor = theme.accentHex;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill all fields", "warning");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast("Message sent successfully!", "success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.05] blur-[120px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* ── Header ── */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-400">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>CONTACT</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          Let&apos;s Build Something
        </h2>
        <p className="mt-3 text-neutral-500 text-sm max-w-xl">
          Open to internships, freelance collaborations, and exciting product ideas. 
          Reach out through any channel below.
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── Left: Contact Cards + Info ── */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* Availability status card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-5 border-emerald-500/[0.08] bg-emerald-500/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  Currently Available
                </span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {PORTFOLIO_DATA.personal.availability}
              </p>
              <div className="mt-4 flex flex-col gap-2 text-xs text-neutral-500 font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Response: {PORTFOLIO_DATA.personal.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{PORTFOLIO_DATA.personal.location} · IST (UTC+5:30)</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Channel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTACT_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.id}
                  href={card.href}
                  target={card.id !== "email" ? "_blank" : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  whileHover={{ y: -2 }}
                  className="group block"
                >
                  <GlassCard className="p-4 h-full flex flex-col gap-3 border-white/[0.03] hover:border-white/10 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center border"
                        style={{ color: card.color, backgroundColor: `${card.color}15`, borderColor: `${card.color}25` }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-neutral-600 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 mb-0.5">
                        {card.label}
                      </p>
                      <p className="text-white text-xs font-semibold truncate">{card.value}</p>
                      <p className="text-neutral-600 text-[10px] mt-0.5">{card.sub}</p>
                    </div>
                  </GlassCard>
                </motion.a>
              );
            })}
          </div>

          {/* Resume placeholder card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard className="p-5 border-amber-500/[0.08] bg-amber-500/[0.02]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    Resume
                  </span>
                </div>
                <span className="text-[9px] uppercase font-mono tracking-wider text-amber-500/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Resume is being finalised and will be available for download shortly.
                Reach out via email or LinkedIn in the meantime.
              </p>
            </GlassCard>
          </motion.div>
        </div>

        {/* ── Right: Contact Form ── */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-6 md:p-8 border-white/[0.03]">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">Send a Message</h3>
              <p className="text-neutral-500 text-sm mt-1">
                Tell me about your project, collaboration idea, or opportunity.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your name"
                        className="w-full bg-neutral-950/60 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="you@example.com"
                        className="w-full bg-neutral-950/60 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project, role, or idea..."
                      className="w-full bg-neutral-950/60 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-all font-mono resize-none"
                    />
                  </div>

                  <div className="pt-1">
                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-white text-black font-semibold border-none rounded-xl"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-3.5 w-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Message <Send className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </MagneticButton>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 flex flex-col items-center justify-center text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Message Received!</h4>
                  <p className="text-neutral-500 text-sm max-w-xs mx-auto mb-6 leading-relaxed">
                    Thanks for reaching out. I&apos;ll get back to you within{" "}
                    {PORTFOLIO_DATA.personal.responseTime.toLowerCase()}.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    Send Another →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
