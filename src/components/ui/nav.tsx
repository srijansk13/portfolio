"use client";

import React, { useState, useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, Command, Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import MagneticButton from "./magnetic-button";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setPaletteOpen, setTerminalOpen, theme } = usePortfolioStore();

  // Lock background window scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle === "visible" ? "" : originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  // Scroll direction detection to auto-hide navbar and detect active section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Hide navbar when scrolling down, show when scrolling up or at the top
          const nextVisible = currentScrollY < 80 || currentScrollY < lastScrollYRef.current;

          setVisible(prev => prev === nextVisible ? prev : nextVisible);
          lastScrollYRef.current = currentScrollY;

          // High-fidelity height-intersection scroll highlighting algorithm
          let maxVisibleHeight = 0;
          let currentActive = "home";

          for (const item of NAV_ITEMS) {
            const el = document.getElementById(item.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const visibleTop = Math.max(0, rect.top);
              const visibleBottom = Math.min(window.innerHeight, rect.bottom);
              const visibleHeight = Math.max(0, visibleBottom - visibleTop);
              
              if (visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                currentActive = item.id;
              }
            }
          }
          setActiveSection(prev => prev === currentActive ? prev : currentActive);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run once on mount to establish correct initial active item
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const accentColor = theme.accentHex;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-0 right-0 z-50 mx-auto flex w-[92%] max-w-7xl items-center justify-between rounded-full border border-white/[0.05] bg-black/40 px-6 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl md:px-8"
          >
            {/* Logo */}
            <div 
              onClick={() => scrollToSection("home")}
              className="flex cursor-pointer items-center gap-2 font-bold tracking-tight text-white select-none"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }}></span>
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: accentColor }}></span>
              </span>
              <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent font-mono">
                SK.DEV
              </span>
            </div>

            {/* Desktop Navigation Link items */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-white ${
                    activeSection === item.id ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.05)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA controls */}
            <div className="flex items-center gap-3">
              {/* Cmd+K shortcut */}
              <button 
                onClick={() => setPaletteOpen(true)}
                className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/[0.05] bg-white/[0.03] px-3.5 py-1.5 text-xs text-neutral-400 hover:text-white hover:border-white/10 transition-all select-none"
              >
                <Command className="h-3.5 w-3.5" />
                <span>Search</span>
                <span className="rounded bg-neutral-800 px-1 py-0.5 font-mono text-[9px]">⌘K</span>
              </button>

              {/* Terminal Widget */}
              <button
                onClick={() => setTerminalOpen(true)}
                className="flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] p-2 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
                title="Open Dev Console"
              >
                <Terminal className="h-4.5 w-4.5" />
              </button>

              {/* View Resume */}
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 h-10 text-xs px-4 rounded-xl border border-white/[0.10] bg-white/[0.04] text-neutral-200 font-semibold hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all select-none"
              >
                <FileText className="h-3.5 w-3.5" />
                View Resume
              </a>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center justify-center rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/5 lg:hidden transition-all"
                aria-expanded={mobileMenuOpen}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile responsive overlay menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex flex-col bg-black/95 backdrop-blur-2xl lg:hidden p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-16">
              <span className="font-mono font-bold text-white tracking-wider">SK.DEV</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full border border-white/10 p-2 text-neutral-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-6 text-3xl font-semibold tracking-tight">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center justify-between text-left text-neutral-400 hover:text-white transition-all py-2 border-b border-white/5"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-5 w-5 opacity-40" />
                </motion.button>
              ))}
            </div>

            {/* Footer details */}
            <div className="mt-auto flex flex-col gap-6">
              <div className="flex items-center gap-5">
                <a href={PORTFOLIO_DATA.personal.socials.github} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                  <FaGithub className="h-6 w-6" />
                </a>
                <a href={PORTFOLIO_DATA.personal.socials.linkedin} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a href={PORTFOLIO_DATA.personal.socials.whatsapp} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  <FaWhatsapp className="h-6 w-6" />
                </a>
              </div>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-4 bg-white text-black font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all"
              >
                <FileText className="h-4 w-4" />
                View Resume
              </a>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl ?? "#"}
                download="Srijan_Kumar_Goud_Resume.pdf"
                className="w-full text-center py-3 bg-white/[0.04] border border-white/[0.10] text-neutral-300 font-medium rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all"
              >
                <ArrowUpRight className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
