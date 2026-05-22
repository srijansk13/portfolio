"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Cpu, Layers, Palette, Box } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import GlassCard from "../ui/glass-card";

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "State & Architecture",
  "AI & Advanced",
  "UI/UX",
];

const getCategoryIcon = (cat: string) => {
  switch (cat) {
    case "Frontend": return Code2;
    case "Backend": return Database;
    case "State & Architecture": return Layers;
    case "AI & Advanced": return Cpu;
    case "UI/UX": return Palette;
    default: return Box;
  }
};

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case "Frontend": return "#60a5fa";
    case "Backend": return "#34d399";
    case "State & Architecture": return "#a78bfa";
    case "AI & Advanced": return "#fb923c";
    case "UI/UX": return "#f472b6";
    default: return "#94a3b8";
  }
};

export default function Skills() {
  const [selectedCat, setSelectedCat] = useState("All");
  const { theme } = usePortfolioStore();
  const accentColor = theme.accentHex;

  const filteredSkills = PORTFOLIO_DATA.skills.filter(
    (skill) => selectedCat === "All" || skill.category === selectedCat
  );

  return (
    <section
      id="skills"
      className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 w-[35vw] h-[35vw] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-400">
          <Code2 className="h-3.5 w-3.5" />
          <span>CAPABILITIES</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          Technical Stack & Ecosystem
        </h2>
        <p className="mt-3 text-neutral-500 text-sm max-w-xl">
          A curated set of technologies I actively use to build production-grade products.
        </p>
      </div>

      {/* Category Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        {CATEGORIES.filter(c => c !== "All").map((cat) => {
          const Icon = getCategoryIcon(cat);
          const color = getCategoryColor(cat);
          const count = PORTFOLIO_DATA.skills.filter(s => s.category === cat).length;
          const active = selectedCat === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCat(active ? "All" : cat)}
              className={`relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all ${
                active
                  ? "border-white/20 bg-white/[0.06]"
                  : "border-white/[0.04] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"
              }`}
            >
              <Icon className="h-4 w-4" style={{ color }} />
              <div>
                <p className="text-white text-xs font-semibold leading-tight">{cat}</p>
                <p className="text-neutral-600 text-[10px] font-mono mt-0.5">{count} skills</p>
              </div>
              {active && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute inset-0 rounded-2xl border"
                  style={{ borderColor: color }}
                />
              )}
            </button>
          );
        })}
        <button
          onClick={() => setSelectedCat("All")}
          className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all ${
            selectedCat === "All"
              ? "border-white/20 bg-white/[0.06]"
              : "border-white/[0.04] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"
          }`}
        >
          <Box className="h-4 w-4 text-neutral-400" />
          <div>
            <p className="text-white text-xs font-semibold">All Skills</p>
            <p className="text-neutral-600 text-[10px] font-mono mt-0.5">{PORTFOLIO_DATA.skills.length} total</p>
          </div>
        </button>
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const color = getCategoryColor(skill.category);
            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
              >
                <GlassCard className="group relative overflow-hidden h-full flex flex-col justify-between p-5 border-white/[0.02] hover:border-white/10 transition-all">
                  {/* Subtle glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${color}08 0%, transparent 70%)` }}
                  />
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded border"
                      style={{ color, borderColor: `${color}30`, backgroundColor: `${color}10` }}
                    >
                      {skill.category.split(" ")[0]}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                      <span className="text-neutral-600">Proficiency</span>
                      <span style={{ color }}>{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-neutral-900/80 overflow-hidden border border-white/[0.02]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${color}99, ${color})`,
                          boxShadow: theme.glowEnabled ? `0 0 8px ${color}55` : "none",
                        }}
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
