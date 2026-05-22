"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  X,
  Maximize2,
  ArrowUpRight,
  Brain,
  BarChart3,
  ShieldCheck,
  Layers,
  Gamepad2,
  Lock,
  CheckSquare,
  Calculator,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio-data";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import GlassCard from "../ui/glass-card";
import MagneticButton from "../ui/magnetic-button";
import BrowserPreview from "../ui/browser-preview";


// ─── Secondary project icon map ─────────────────────────────────────────────

const SECONDARY_ICONS: Record<string, React.ReactNode> = {
  "career-landing": <Brain className="h-5 w-5" />,
  "auracalc-x": <Calculator className="h-5 w-5" />,
  "cipherkey": <Lock className="h-5 w-5" />,
  "smart-task-manager": <CheckSquare className="h-5 w-5" />,
};

// ─── Main component ──────────────────────────────────────────────────────────

export default function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "case" | "architecture">("overview");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const { theme } = usePortfolioStore();
  const accentColor = theme.accentHex;

  return (
    <section
      id="projects"
      className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-[0.04] blur-[120px] pointer-events-none rounded-full"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* ── Section Header ── */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-400">
          <Sparkles className="h-3.5 w-3.5" style={{ color: accentColor }} />
          <span>FEATURED PROJECTS</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          Products I've Built
        </h2>
        <p className="mt-3 text-neutral-500 text-sm max-w-2xl">
          Production-grade applications showcasing AI engineering, SaaS architecture, and premium frontend craftsmanship.
        </p>
      </div>

      {/* ── Featured Projects ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-stretch">
        {PORTFOLIO_DATA.projects.map((project, idx) => {
          const isFlagship = project.id === "career-copilot";
          const isHovered = hoveredCardId === project.id;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="w-full flex"
            >
              <GlassCard 
                className="relative overflow-hidden group flex flex-col justify-between h-full p-6 md:p-8 border-white/[0.03] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  borderColor: isHovered ? `${accentColor}40` : "rgba(255,255,255,0.03)",
                  boxShadow: isHovered ? `0 0 50px ${accentColor}18` : `0 0 40px rgba(0,0,0,0.2)`,
                }}
              >
                {/* Badge */}
                {isFlagship ? (
                  <span
                    className="absolute top-6 right-6 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 backdrop-blur-md z-10"
                    style={{
                      borderColor: `${accentColor}40`,
                      color: accentColor,
                      backgroundColor: `${accentColor}10`
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                    Flagship Product
                  </span>
                ) : project.badge && (
                  <span
                    className="absolute top-6 right-6 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5 backdrop-blur-md z-10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                    {project.badge}
                  </span>
                )}

                <div className="w-full">
                  {/* Category + name */}
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight sm:text-3xl mb-1">
                    {project.name}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-3xl mb-6 min-h-[60px]">
                    {project.shortDesc}
                  </p>

                  {/* High-Fidelity Sandboxed Live Browser Frame */}
                  <div className="group-hover:scale-[1.025] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center">
                    <BrowserPreview url={project.live} title={project.name} accentColor={accentColor} />
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] font-mono text-neutral-400"
                      >
                        <ShieldCheck className="h-2.5 w-2.5 text-emerald-500/70 shrink-0" style={{ color: accentColor }} />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-neutral-900/60 border border-white/[0.05] px-2 py-0.5 font-mono text-[9px] text-neutral-400 uppercase tracking-widest"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto">
                  <MagneticButton
                    onClick={() => { setActiveProject(project); setActiveTab("overview"); }}
                    className="h-10 text-xs px-4 bg-white/[0.02] text-neutral-400 border border-white/5 hover:bg-white/10 hover:text-white group-hover:text-neutral-200 group-hover:border-white/10 transition-all duration-300"
                  >
                    Case Study
                  </MagneticButton>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <button className="rounded-full border border-white/[0.03] bg-white/[0.01] p-2.5 text-neutral-500 hover:text-white hover:bg-white/10 hover:border-white/20 group-hover:text-neutral-400 group-hover:border-white/10 transition-all duration-300">
                      <FaGithub className="h-4 w-4" />
                    </button>
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <button className="rounded-full border border-white/[0.03] bg-white/[0.01] p-2.5 text-neutral-500 hover:text-white hover:bg-white/10 hover:border-white/20 group-hover:text-neutral-400 group-hover:border-white/10 transition-all duration-300">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* ── Secondary Projects Grid ── */}
      <div>
        <div className="flex flex-col items-start mb-10">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-400 mb-4">
            <Layers className="h-3.5 w-3.5" />
            <span>MORE PROJECTS</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
            Other Builds
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.secondaryProjects.map((proj, idx) => {
            const isHovered = hoveredCardId === proj.id;
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                onMouseEnter={() => setHoveredCardId(proj.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <GlassCard 
                  className="group h-full flex flex-col justify-between p-5 border-white/[0.02] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    borderColor: isHovered ? `${accentColor}30` : "rgba(255,255,255,0.02)",
                    boxShadow: isHovered ? `0 0 40px ${accentColor}12` : `0 0 20px rgba(0,0,0,0.1)`,
                  }}
                >
                  {/* Compact Browser Frame + Info */}
                  <div>
                    <div className="group-hover:scale-[1.025] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center">
                      <BrowserPreview url={proj.live} title={proj.name} isCompact={true} accentColor={accentColor} />
                    </div>

                    <div className="flex items-center gap-2.5 mb-2 mt-4">
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center border shrink-0"
                        style={{
                          backgroundColor: `${accentColor}10`,
                          borderColor: `${accentColor}25`,
                          color: accentColor,
                        }}
                      >
                        {SECONDARY_ICONS[proj.id] || <BarChart3 className="h-4 w-4" />}
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-neutral-200 transition-colors">
                        {proj.name}
                      </h4>
                    </div>

                    <p className="text-neutral-500 text-xs leading-relaxed mb-4 min-h-[36px]">
                      {proj.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-5">
                      {proj.techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-neutral-900/60 border border-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-neutral-500 uppercase tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 pt-4 border-t border-white/[0.04] mt-auto">
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-neutral-500 group-hover:text-neutral-300 hover:text-white transition-colors uppercase tracking-wider"
                    >
                      <ArrowUpRight className="h-3 w-3" />
                      Live Demo
                    </a>
                    <span className="h-3 w-px bg-white/10" />
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-neutral-500 group-hover:text-neutral-300 hover:text-white transition-colors uppercase tracking-wider"
                    >
                      <FaGithub className="h-3 w-3" />
                      Source
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl h-[88vh] rounded-3xl overflow-hidden flex flex-col border border-white/10 shadow-2xl bg-neutral-950/95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] bg-black/40 shrink-0">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1">
                    PRODUCT CASE STUDY
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight sm:text-xl">
                    {activeProject.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="rounded-full border border-white/10 p-2 text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex border-b border-white/[0.05] bg-black/20 px-6 py-2.5 gap-2 shrink-0">
                {(["overview", "architecture", "case"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-1.5 text-xs font-mono font-semibold tracking-wider transition-all uppercase ${
                      activeTab === tab
                        ? "bg-white/10 text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {tab === "overview" && "Overview"}
                    {tab === "architecture" && "Architecture"}
                    {tab === "case" && "Process & Results"}
                  </button>
                ))}
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-bold mb-3">
                        PRODUCT DESCRIPTION
                      </h4>
                      <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                        {activeProject.longDesc}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-bold mb-3">
                        KEY HIGHLIGHTS
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.highlights.map((h) => (
                          <span
                            key={h}
                            className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 font-mono"
                          >
                            <ShieldCheck className="h-3 w-3" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-bold mb-3">
                        TECH STACK
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white/5 border border-white/[0.06] px-3.5 py-1 text-xs text-neutral-300 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "architecture" && (
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-bold mb-2">
                      SYSTEM ARCHITECTURE LAYERS
                    </h4>
                    {activeProject.caseStudy.architecture.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 border border-white/[0.05] rounded-2xl p-5 bg-white/[0.01]"
                      >
                        <span className="h-8 w-8 rounded-full bg-white/5 border border-white/[0.06] font-mono text-sm font-bold flex items-center justify-center text-white shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className="text-sm font-semibold text-white block">Layer {idx + 1}</span>
                          <span className="text-xs text-neutral-400 mt-1 block leading-relaxed">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "case" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-bold mb-2">THE CHALLENGE</h4>
                        <p className="text-neutral-300 text-sm leading-relaxed">{activeProject.caseStudy.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-bold mb-2">THE OUTCOME</h4>
                        <p className="text-neutral-300 text-sm leading-relaxed">{activeProject.caseStudy.results}</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-bold mb-2">THE SOLUTION</h4>
                        <p className="text-neutral-300 text-sm leading-relaxed">{activeProject.caseStudy.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-bold mb-2">OBSTACLES FACED</h4>
                        <p className="text-neutral-300 text-sm leading-relaxed">{activeProject.caseStudy.challenges}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center gap-3 px-6 py-5 border-t border-white/[0.05] bg-black/40 shrink-0">
                <a href={activeProject.live} target="_blank" rel="noopener noreferrer">
                  <MagneticButton className="h-10 text-xs px-5 bg-white text-black font-semibold border-none">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Visit Live App
                  </MagneticButton>
                </a>
                <a href={activeProject.github} target="_blank" rel="noopener noreferrer">
                  <MagneticButton className="h-10 text-xs px-5 bg-neutral-900 text-white font-semibold border-white/10 hover:bg-neutral-800">
                    <FaGithub className="mr-1.5 h-3.5 w-3.5" />
                    View Source
                  </MagneticButton>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
