"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, Zap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import GlassCard from "../ui/glass-card";

export default function Experience() {
  const { theme } = usePortfolioStore();
  const accentColor = theme.accentHex;

  return (
    <section
      id="experience"
      className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-400">
          <Briefcase className="h-3.5 w-3.5" />
          <span>EXPERIENCE</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          Professional Journey
        </h2>
        <p className="mt-3 text-neutral-500 text-sm max-w-xl">
          Real-world engineering experience — building and shipping in production environments.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-white/[0.06] pl-6 md:pl-10 ml-4 md:ml-6 flex flex-col gap-10">
        {PORTFOLIO_DATA.experience.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Node */}
            <span className="absolute -left-[35px] md:-left-[51px] top-2 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-black border border-white/10 shadow-md">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: exp.isCurrent ? "#34d399" : accentColor,
                  boxShadow: theme.glowEnabled
                    ? `0 0 10px ${exp.isCurrent ? "#34d399" : accentColor}`
                    : "none",
                }}
              />
            </span>

            <GlassCard className="p-6 md:p-8 hover:border-white/10 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  {/* Company Logo Letter */}
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0 border"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      borderColor: `${accentColor}30`,
                      color: accentColor,
                    }}
                  >
                    {exp.logoLetter}
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-0.5">
                      {exp.company}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">{exp.role}</h3>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2">
                  <div className="flex items-center gap-2 rounded-full bg-white/[0.02] border border-white/5 px-3 py-1 text-xs text-neutral-400 font-mono w-fit">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{exp.duration}</span>
                  </div>
                  {exp.isCurrent ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-600">
                      <Zap className="h-2.5 w-2.5" />
                      {exp.type}
                    </span>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <ul className="flex flex-col gap-3 mb-6 text-sm text-neutral-400">
                {exp.achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500/80" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-neutral-900/60 border border-white/5 px-2 py-0.5 font-mono text-[10px] text-neutral-400 uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
