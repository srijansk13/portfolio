"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

export default function Toasts() {
  const { toasts, removeToast } = usePortfolioStore();

  return (
    <div className="fixed bottom-6 left-6 z-100 flex flex-col gap-2 max-w-sm w-full select-none pointer-events-none" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="pointer-events-auto flex items-center justify-between rounded-xl border border-white/10 bg-black/80 px-4 py-3.5 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />}
              {toast.type === "warning" && <AlertCircle className="h-4.5 w-4.5 text-amber-400 shrink-0" />}
              {toast.type === "info" && <Info className="h-4.5 w-4.5 text-blue-400 shrink-0" />}
              <span className="text-xs font-mono font-medium text-white">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-neutral-500 hover:text-white p-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
