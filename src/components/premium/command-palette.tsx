"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, ShieldAlert, Sparkles, Terminal, FileDown } from "lucide-react";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export default function CommandPalette() {
  const { isPaletteOpen, setPaletteOpen, setTerminalOpen, updateTheme, addToast } = usePortfolioStore();
  const [searchVal, setSearchVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Cmd/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(!isPaletteOpen);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearchVal("");
    }
  }, [isPaletteOpen]);

  const handleLinkClick = (id: string) => {
    setPaletteOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      addToast(`Scrolled to ${id}`, "info");
    }
  };

  const commandItems = [
    { label: "Navigate: Home Section", action: () => handleLinkClick("home"), category: "NAVIGATION" },
    { label: "Navigate: About Section", action: () => handleLinkClick("about"), category: "NAVIGATION" },
    { label: "Navigate: Skills Section", action: () => handleLinkClick("skills"), category: "NAVIGATION" },
    { label: "Navigate: Projects Section", action: () => handleLinkClick("projects"), category: "NAVIGATION" },
    { label: "Navigate: Experience Section", action: () => handleLinkClick("experience"), category: "NAVIGATION" },
    { label: "Navigate: Contact Details", action: () => handleLinkClick("contact"), category: "NAVIGATION" },
    
    { label: "Launch Developer Console", action: () => { setPaletteOpen(false); setTerminalOpen(true); }, category: "UTILITY" },
    
    { label: "Switch Accent: Space Violet", action: () => { updateTheme({ accentColor: "violet" }); addToast("Accent switched to Space Violet", "success"); setPaletteOpen(false); }, category: "THEME" },
    { label: "Switch Accent: Neon Cyan", action: () => { updateTheme({ accentColor: "cyan" }); addToast("Accent switched to Neon Cyan", "success"); setPaletteOpen(false); }, category: "THEME" },
    { label: "Switch Accent: Hot Pink", action: () => { updateTheme({ accentColor: "pink" }); addToast("Accent switched to Hot Pink", "success"); setPaletteOpen(false); }, category: "THEME" },
    { label: "Switch Accent: Emerald Green", action: () => { updateTheme({ accentColor: "emerald" }); addToast("Accent switched to Emerald Green", "success"); setPaletteOpen(false); }, category: "THEME" }
  ];

  const filteredCommands = commandItems.filter(
    (item) => item.label.toLowerCase().includes(searchVal.toLowerCase()) || item.category.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-start justify-center bg-black/60 backdrop-blur-md pt-[15vh] px-4"
          onClick={() => setPaletteOpen(false)}
        >
          {/* Main Pane Card */}
          <motion.div
            initial={{ y: -20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-lg rounded-2xl border border-white/10 glass-panel-heavy overflow-hidden shadow-2xl flex flex-col max-h-[450px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-black/40">
              <Search className="h-4.5 w-4.5 text-neutral-500" />
              <input
                ref={inputRef}
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search commands, navigate sections..."
                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder-neutral-500 font-mono"
              />
              <span className="rounded bg-neutral-900 border border-white/5 px-1.5 py-0.5 text-[9px] font-mono text-neutral-500">ESC</span>
            </div>

            {/* List entries */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5 no-scrollbar select-none">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] group text-left transition-all"
                  >
                    <span className="text-xs font-mono font-medium text-neutral-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-mono text-neutral-500 border border-white/5 bg-neutral-900 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </button>
                ))
              ) : (
                <div className="py-12 text-center text-xs text-neutral-500 font-mono flex flex-col items-center justify-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-neutral-600" />
                  <span>No results match payload filters</span>
                </div>
              )}
            </div>

            {/* Commands footer */}
            <div className="px-4 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" />
                <span>Command Shell Controls</span>
              </span>
              <span>Use Arrow keys / Enter</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
