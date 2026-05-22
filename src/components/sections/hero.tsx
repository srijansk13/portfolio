"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Mail,
  Sparkles,
  Terminal,
  ExternalLink,
  Clock,
  FileText,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import MagneticButton from "../ui/magnetic-button";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { setTerminalOpen, setPaletteOpen, theme } = usePortfolioStore();
  const [particles, setParticles] = useState<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }[]>([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const generated = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 6,
    }));
    setParticles(generated);

    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PORTFOLIO_DATA.personal.roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const accentColor = theme.accentHex;

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full overflow-hidden"
    >
      {/* Ambient Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

      {/* Floating Ambient Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: accentColor,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Left accent glow */}
      <div
        className="absolute top-1/3 left-0 w-[40vw] h-[40vw] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* ========== MAIN CONTENT — SPLIT LAYOUT ========== */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 gap-12 lg:gap-0">

        {/* ---- LEFT: Intro Content ---- */}
        <div className="flex flex-col items-start max-w-xl lg:max-w-[52%] w-full">

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs text-neutral-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{PORTFOLIO_DATA.personal.availability}</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-b from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent leading-[1.05]"
          >
            {PORTFOLIO_DATA.personal.fullName}
          </motion.h1>

          {/* Animated Role */}
          <div className="mt-5 h-10 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 font-mono text-lg sm:text-xl font-medium"
                style={{ color: accentColor }}
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                {PORTFOLIO_DATA.personal.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base leading-relaxed text-neutral-400 sm:text-lg max-w-lg"
          >
            {PORTFOLIO_DATA.personal.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row flex-wrap items-start gap-3"
          >
            <MagneticButton
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-12 bg-white text-black font-semibold border-none px-7 hover:bg-neutral-200 text-sm"
            >
              Explore Projects
            </MagneticButton>

            <MagneticButton
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-12 bg-neutral-900/60 text-white font-semibold border-white/10 px-7 hover:bg-neutral-900 text-sm"
            >
              Contact Me
            </MagneticButton>

            {/* Resume — Coming Soon */}
            <button
              disabled
              className="relative h-12 px-7 rounded-xl border border-white/[0.06] bg-white/[0.02] text-neutral-500 font-semibold text-sm flex items-center gap-2 cursor-not-allowed select-none"
              title="Resume will be available soon"
            >
              <FileText className="h-4 w-4" />
              Resume Coming Soon
              <span className="absolute -top-2 -right-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.5 text-[8px] font-bold text-amber-400 uppercase tracking-wider">Soon</span>
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-10 flex items-center gap-5"
          >
            <a
              href={PORTFOLIO_DATA.personal.socials.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-all duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono hidden sm:block">GitHub</span>
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a
              href={PORTFOLIO_DATA.personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-all duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono hidden sm:block">LinkedIn</span>
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a
              href={PORTFOLIO_DATA.personal.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-neutral-500 hover:text-emerald-400 transition-all duration-200"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono hidden sm:block">WhatsApp</span>
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a
              href={PORTFOLIO_DATA.personal.socials.email}
              className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono hidden sm:block">Email</span>
            </a>
          </motion.div>

          {/* Keyboard shortcut hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex items-center gap-2 text-[10px] font-mono text-neutral-600"
          >
            <kbd className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5">⌘</kbd>
            <kbd className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5">K</kbd>
            <span>to search portfolio</span>
          </motion.div>
        </div>

        {/* ---- RIGHT: Cinematic Portrait Framework ---- */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:ml-auto lg:-mt-8 flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-3xl opacity-25 blur-2xl transition-all duration-500"
            style={{ 
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            }}
          />

          {/* Glass frame */}
          <motion.div 
            className="relative rounded-3xl border bg-white/[0.03] backdrop-blur-md overflow-hidden shadow-2xl group/portrait transition-all duration-300"
            style={{ borderColor: `${accentColor}20` }}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              borderColor: `${accentColor}40`,
              boxShadow: `0 20px 40px -15px ${accentColor}15`
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Top bar mockup */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-black/30 select-none">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[9px] font-mono text-neutral-600 tracking-widest">srijan.portfolio</span>
              <ExternalLink className="h-3 w-3 text-neutral-700" />
            </div>

            {/* Portrait area */}
            <div className="relative aspect-[4/5] bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center overflow-hidden">
              {/* Cinematic gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover/portrait:opacity-80 z-10 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${accentColor}18 0%, transparent 70%)`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

              {/* Photo or initials fallback */}
              {!imageError ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/profile.png"
                    alt="Budige Srijan Kumar Goud"
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
                    priority
                    quality={95}
                    onError={() => setImageError(true)}
                    className="object-cover object-[center_20%] scale-[1.12] transition-transform duration-700 ease-out group-hover/portrait:scale-[1.18]"
                  />
                  {/* Subtle dark vignette blending layers */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,2,4,0.9)_100%)] z-10 pointer-events-none mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/40 to-transparent opacity-95 z-10 pointer-events-none" />
                </div>
              ) : (
                /* Fallback Initials monogram */
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <motion.div
                    className="h-28 w-28 rounded-full border-2 flex items-center justify-center text-4xl font-extrabold tracking-tight text-white shadow-2xl"
                    style={{
                      borderColor: `${accentColor}50`,
                      background: `radial-gradient(circle at 40% 30%, ${accentColor}20, transparent 70%), rgba(255,255,255,0.03)`,
                      boxShadow: `0 0 60px ${accentColor}20`,
                    }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    SK
                  </motion.div>
                  <div className="text-center mt-2">
                    <p className="text-white font-bold text-base tracking-tight">Srijan Kumar</p>
                    <p className="text-neutral-500 text-xs font-mono mt-0.5">CS Engineer · Hyderabad</p>
                  </div>
                </div>
              )}

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-16 left-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm px-3 py-2 text-left z-20"
              >
                <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">CGPA</p>
                <p className="text-white font-bold text-sm font-mono">8.95 / 10</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-16 right-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm px-3 py-2 text-left z-20"
              >
                <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Status</p>
                <p className="text-emerald-400 font-bold text-sm font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Available
                </p>
              </motion.div>
            </div>

            {/* Bottom strip */}
            <div className="px-4 py-3 bg-black/40 border-t border-white/[0.04]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-neutral-600 font-mono uppercase tracking-wider">Role</p>
                  <p className="text-white text-xs font-semibold mt-0.5">Full Stack + AI Builder</p>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-neutral-500">
                  <Clock className="h-2.5 w-2.5" />
                  <span>IST (UTC+5:30)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020204] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 opacity-30 hover:opacity-80 transition-opacity select-none z-20"
      >
        <span className="text-[10px] font-mono tracking-widest text-neutral-400">SCROLL</span>
        <ArrowDown className="h-4 w-4 text-white" />
      </motion.div>
    </section>
  );
}
