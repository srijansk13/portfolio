"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TermIcon, X, Maximize2, Minimize2, Play } from "lucide-react";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

export default function TerminalWidget() {
  const { isTerminalOpen, setTerminalOpen, terminalLogs, runTerminalCommand, theme } = usePortfolioStore();
  const [inputVal, setInputVal] = useState("");
  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs, isTerminalOpen]);

  // Lock body scroll and preserve scroll position when open
  useEffect(() => {
    if (isTerminalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      
      // Auto-focus terminal input
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isTerminalOpen]);

  // ESC key listener to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTerminalOpen(false);
      }
    };
    if (isTerminalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTerminalOpen, setTerminalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    runTerminalCommand(inputVal);
    setInputVal("");
  };

  const accentColor = theme.accentHex;

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 cursor-pointer"
          onClick={() => setTerminalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-2xl h-[70vh] rounded-2xl overflow-hidden glass-panel-heavy flex flex-col border border-white/10 shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header OS style buttons */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-950/80 border-b border-white/5 select-none">
              <div className="flex items-center gap-1.5">
                <span 
                  className="h-3 w-3 rounded-full cursor-pointer bg-rose-500/80 hover:bg-rose-500 transition-colors" 
                  onClick={() => setTerminalOpen(false)}
                  title="Close Terminal"
                />
                <span className="h-3 w-3 rounded-full bg-amber-500/50" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/50" />
              </div>

              {/* Back to Portfolio Button */}
              <button
                onClick={() => setTerminalOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/20 hover:bg-neutral-800 text-[10px] font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                ← Back to Portfolio
              </button>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <TermIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">guest@sk-os: ~</span>
                </div>
                {/* Clickable X Icon */}
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="p-1 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Exit Terminal (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Console logs box */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs no-scrollbar bg-black/90">
              {terminalLogs.map((log, idx) => {
                let color = "text-neutral-300";
                if (log.type === "input") color = "text-blue-400";
                else if (log.type === "error") color = "text-rose-400";
                else if (log.type === "success") color = "text-emerald-400";
                return (
                  <div key={idx} className={`${color} leading-relaxed break-all whitespace-pre-wrap`}>
                    {log.line}
                  </div>
                );
              })}
              <div ref={logsEndRef} />
            </div>

            {/* CLI input command row */}
            <form 
              onSubmit={handleSubmit}
              className="border-t border-white/5 bg-neutral-950/80 p-3.5 flex items-center gap-2 font-mono text-xs text-neutral-400"
            >
              <span className="text-blue-400 select-none">guest@sk-os:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'help' for operational shell systems..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-700"
              />
              <button 
                type="submit" 
                className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                title="Execute command"
              >
                <Play className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
