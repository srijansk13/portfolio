"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Zap, Heart, Brain, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import GlassCard from "../ui/glass-card";

export default function About() {
  const { theme } = usePortfolioStore();
  const accentColor = theme.accentHex;

  return (
    <section
      id="about"
      className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-400">
          <Brain className="h-3.5 w-3.5" />
          <span>ABOUT</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          Builder. Engineer. Creator.
        </h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Core Story — spans 7 cols */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <GlassCard className="p-8 h-full flex flex-col justify-between min-h-[260px]">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Layers className="h-4 w-4" style={{ color: accentColor }} />
                  Product Engineering Mindset
                </h3>
                <p className="text-neutral-400 leading-relaxed mb-4">
                  I&apos;m a Computer Science student at GIET, building AI-powered SaaS products and
                  premium frontend systems. My focus is on crafting immersive, production-grade digital
                  experiences — from AI workflow pipelines to polished SaaS dashboards.
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  I think in products, not just code. Every interface I build is designed with
                  real users in mind — performance-first, visually precise, and architecturally sound.
                  My goal is to be the developer who bridges strong engineering with elite UI craftsmanship.
                </p>
              </div>

              {/* Small Portrait Mockup in About Section */}
              <div 
                className="relative shrink-0 w-full md:w-44 aspect-[3/4] md:aspect-auto md:h-[210px] rounded-2xl border bg-white/[0.02] backdrop-blur-md overflow-hidden group/about-pic hidden md:block transition-all duration-300"
                style={{ borderColor: `${accentColor}15` }}
              >
                <Image
                  src="/images/profile.png"
                  alt="Budige Srijan Kumar Goud"
                  fill
                  sizes="176px"
                  className="object-cover object-[center_20%] scale-[1.12] transition-transform duration-500 ease-out group-hover/about-pic:scale-[1.18]"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,2,4,0.7)_100%)] z-10 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-transparent opacity-90 z-10 pointer-events-none" />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 items-center text-sm text-neutral-400 font-mono pt-6 border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-rose-500" /> SaaS Architecture
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
              <span className="flex items-center gap-1.5">
                <Brain className="h-4 w-4" style={{ color: accentColor }} /> AI Systems
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" /> Premium UI/UX
              </span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Stats — spans 5 cols */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[
            { label: "Projects Shipped", value: "6+", icon: Briefcase, color: accentColor },
            { label: "CGPA (B.Tech CSE)", value: "8.95", icon: GraduationCap, color: "#34d399" },
            { label: "Internships", value: "2", icon: Zap, color: "#f59e0b" },
            { label: "Open to Work", value: "Yes ✓", icon: Heart, color: "#f43f5e" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <GlassCard className="flex flex-col items-start justify-between h-full p-5 border-white/[0.02]">
                  <div className="rounded-xl bg-white/[0.03] p-2.5 mb-4">
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-white font-mono tracking-tight sm:text-3xl block">
                      {stat.value}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium mt-1 block">
                      {stat.label}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Education Timeline */}
      <div className="mt-12">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-400 w-fit mb-10">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>EDUCATION</span>
        </div>

        <div className="relative border-l border-white/[0.06] pl-6 md:pl-10 ml-3 flex flex-col gap-8">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline node */}
              <span
                className="absolute -left-[33px] md:-left-[49px] top-2 flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-black border border-white/10 text-sm"
              >
                {edu.icon}
              </span>

              <GlassCard className="p-6 hover:border-white/10 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <span
                      className="text-[10px] uppercase font-mono tracking-widest font-bold block mb-1"
                      style={{ color: accentColor }}
                    >
                      {edu.year}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">{edu.degree}</h3>
                    <p className="text-neutral-500 text-sm mt-0.5">{edu.institution}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div
                      className="rounded-xl border px-4 py-2 text-center min-w-[80px]"
                      style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}
                    >
                      <span className="text-lg font-bold font-mono text-white block">{edu.grade}</span>
                      <span className="text-[9px] text-neutral-500 uppercase tracking-wider block">{edu.gradeLabel}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
