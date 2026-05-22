"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Eye, RefreshCw, BarChart2, ShieldAlert, Check, X, Sparkles } from "lucide-react";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import GlassCard from "../ui/glass-card";

export default function ThemeCustomizer() {
  const { theme, updateTheme, addToast } = usePortfolioStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"theme" | "analytics">("theme");

  const colors: ("blue" | "violet" | "cyan" | "pink" | "emerald")[] = [
    "blue", "violet", "cyan", "pink", "emerald"
  ];

  const densities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];

  const accentColor = theme.accentHex;

  return (
    <>
      {/* Floating Gear Settings Toggle */}
      <button
        onClick={() => {
          setIsOpen(true);
          addToast("Opened customizer portal", "info");
        }}
        className="fixed bottom-6 left-6 z-40 rounded-full border border-white/10 bg-black/60 p-4 text-white shadow-2xl backdrop-blur-md hover:bg-neutral-900 transition-all group"
        title="Customizer panel"
      >
        <Settings className="h-6 w-6 group-hover:rotate-45 transition-transform" />
      </button>

      {/* Slide-out Customizer Pane */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm border-r border-white/10 glass-panel-heavy flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-black/40 border-b border-white/5 select-none">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1">
                  PORTFOLIO CONTROL CORE
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Dashboard Settings
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/5 p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Sub navigation tabs */}
            <div className="flex border-b border-white/5 bg-black/25 px-6 py-2 gap-2 select-none">
              <button
                onClick={() => setActiveTab("theme")}
                className={`rounded-full px-4 py-1.5 text-xs font-mono font-semibold tracking-wider transition-all uppercase ${
                  activeTab === "theme" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                Customizer
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`rounded-full px-4 py-1.5 text-xs font-mono font-semibold tracking-wider transition-all uppercase ${
                  activeTab === "analytics" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                Live Stats
              </button>
            </div>

            {/* Scrollable contents panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              
              {activeTab === "theme" && (
                <div className="space-y-6">
                  {/* Accent Swapper */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold block">
                      Accent Color Theme
                    </span>
                    <div className="flex gap-2">
                      {colors.map((c) => {
                        let bg = "bg-blue-600";
                        if (c === "violet") bg = "bg-purple-600";
                        else if (c === "cyan") bg = "bg-cyan-400";
                        else if (c === "pink") bg = "bg-rose-500";
                        else if (c === "emerald") bg = "bg-emerald-500";

                        const active = theme.accentColor === c;

                        return (
                          <button
                            key={c}
                            onClick={() => {
                              updateTheme({ accentColor: c });
                              addToast(`Color switched to ${c}`, "success");
                            }}
                            className={`h-8 w-8 rounded-full border border-white/10 ${bg} flex items-center justify-center transition-all ${
                              active ? "scale-110 shadow-lg" : "opacity-60 hover:opacity-100"
                            }`}
                            style={{ 
                              boxShadow: active ? `0 0 15px var(--color-primary)` : "none",
                            }}
                          >
                            {active && <Check className="h-4 w-4 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Particle density controls */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold block animate-pulse">
                      3D Particles Density
                    </span>
                    <div className="flex gap-1.5">
                      {densities.map((d) => {
                        const active = theme.particleDensity === d;
                        return (
                          <button
                            key={d}
                            onClick={() => {
                              updateTheme({ particleDensity: d });
                              addToast(`Particle density is ${d}`, "info");
                            }}
                            className={`flex-1 rounded-xl py-2.5 text-[10px] font-bold font-mono tracking-wider transition-all uppercase ${
                              active
                                ? "bg-white text-black"
                                : "border border-white/5 bg-white/[0.02] text-neutral-400 hover:text-white"
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Glow effect toggle */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold block">
                      Glow Interactions
                    </span>
                    <button
                      onClick={() => {
                        updateTheme({ glowEnabled: !theme.glowEnabled });
                        addToast(`Glow is ${!theme.glowEnabled ? "active" : "disabled"}`, "info");
                      }}
                      className="w-full flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition-all font-mono text-xs"
                    >
                      <span className="text-neutral-400">Card & Border Glows</span>
                      <span className={theme.glowEnabled ? "text-emerald-400" : "text-neutral-500"}>
                        {theme.glowEnabled ? "ENABLED" : "DISABLED"}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  {/* Visitor Analytics simulation */}
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold block">
                      Visitor Live Metrics
                    </span>

                    <div className="border border-white/5 rounded-2xl p-5 bg-white/[0.01] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest block select-none">PAGE VIEWS</span>
                        <span className="text-xl font-bold font-mono tracking-tight text-white block mt-1">1,248</span>
                      </div>
                      <BarChart2 className="h-6 w-6 text-neutral-500" />
                    </div>

                    <div className="border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest block select-none mb-2">OPERATIONAL SERVER COMPILING LATENCY</span>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-400">Vercel compilation delay</span>
                        <span className="text-emerald-400">45ms (EXCELLENT)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
