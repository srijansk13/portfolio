"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ExternalLink, ShieldAlert, MousePointerClick, Lock, RefreshCw } from "lucide-react";

interface BrowserPreviewProps {
  url: string;
  title: string;
  isCompact?: boolean;
  accentColor?: string;
}

export default function BrowserPreview({
  url,
  title,
  isCompact = false,
  accentColor = "#10b981", // default emerald-500
}: BrowserPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trim URL for display in browser bar
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  // Mount logic for Next.js SSR compatibility
  useEffect(() => {
    setMounted(true);

    // Timeout fallback (6 seconds)
    timeoutRef.current = setTimeout(() => {
      setLoading((prevLoading) => {
        if (prevLoading) {
          // If still loading after 6s, trigger fallback state
          setFailed(true);
          return false;
        }
        return prevLoading;
      });
    }, 6000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handle clicking outside to automatically disable interactive sandbox mode
  useEffect(() => {
    if (!interactive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setInteractive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [interactive]);

  const handleIframeLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoading(false);
    setFailed(false);
  };

  const handleIframeError = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoading(false);
    setFailed(true);
  };

  const retryLoad = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFailed(false);
    setLoading(true);
    setInteractive(false);

    // Start a new timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setLoading((prevLoading) => {
        if (prevLoading) {
          setFailed(true);
          return false;
        }
        return prevLoading;
      });
    }, 6000);
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl border overflow-hidden flex flex-col w-full transition-all duration-500 bg-neutral-950/80 backdrop-blur-md group-hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] ${
        isCompact 
          ? "h-[180px] border-white/[0.04] mb-4" 
          : "h-[300px] sm:h-[340px] border-white/[0.06] mb-6"
      }`}
      style={{
        borderColor: !isCompact ? `${accentColor}20` : undefined,
      }}
    >
      {/* ── Browser Chrome ── */}
      <div 
        className={`flex items-center justify-between bg-neutral-950/95 border-b border-white/[0.05] shrink-0 select-none ${
          isCompact ? "px-3 py-1.5" : "px-4 py-2.5"
        }`}
      >
        {/* Window dots */}
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500/70" />
          <span className="h-2 w-2 rounded-full bg-amber-500/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
        </div>

        {/* Address bar */}
        <div 
          className={`font-mono text-neutral-500 bg-neutral-900/60 border border-white/5 px-4 rounded-md truncate select-all flex items-center gap-1.5 ${
            isCompact ? "text-[8px] py-0.5 max-w-[130px]" : "text-[10px] py-1 max-w-[180px] sm:max-w-xs"
          }`}
        >
          <Globe className="h-2.5 w-2.5 text-neutral-600 shrink-0" />
          <span className="truncate">{displayUrl}</span>
        </div>

        {/* Action badge or simple spacer */}
        <div>
          {!isCompact ? (
            <span 
              className="text-[8px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded border flex items-center gap-1"
              style={{
                color: accentColor,
                borderColor: `${accentColor}30`,
                backgroundColor: `${accentColor}05`
              }}
            >
              <span className={`h-1 w-1 rounded-full`} style={{ backgroundColor: accentColor }} />
              Live Preview
            </span>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>

      {/* ── Viewport ── */}
      <div className="flex-1 bg-[#040407] relative overflow-hidden flex items-center justify-center">
        {/* 1. Client-side Iframe rendering */}
        {mounted && !failed && (
          <iframe
            src={url}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer-when-downgrade"
            className={`w-full h-full border-none bg-neutral-950 transition-all duration-700 ${
              isCompact ? "pointer-events-none select-none scale-[0.95] origin-top" : ""
            } ${loading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
            style={{
              pointerEvents: interactive ? "auto" : "none",
            }}
          />
        )}

        {/* 2. Loading Shimmer & Skeleton */}
        {loading && (
          <div className="absolute inset-0 flex flex-col p-5 gap-4 bg-neutral-950 z-20 animate-pulse animate-duration-1000">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-neutral-900 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-neutral-900 rounded w-1/3" />
                <div className="h-2 bg-neutral-900 rounded w-1/4" />
              </div>
            </div>
            <div className="flex-1 bg-neutral-950 border border-white/[0.02] rounded-xl flex flex-col items-center justify-center p-6 gap-3">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <span 
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: `${accentColor}20` }}
                />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
              </div>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Loading live preview...
              </p>
            </div>
          </div>
        )}

        {/* 3. Transparent Scroll-Trapping Overlay (Flagship/standard preview only) */}
        {mounted && !isCompact && !interactive && !loading && !failed && (
          <div
            onClick={() => setInteractive(true)}
            className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[0.5px] flex flex-col items-center justify-center cursor-pointer hover:bg-black/55 transition-all duration-300 group"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/10 group-hover:border-white/20 text-[10px] font-mono text-neutral-200 font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2.5 backdrop-blur-md transition-all"
            >
              <MousePointerClick className="h-3.5 w-3.5" style={{ color: accentColor }} />
              <span>Click to interact with live preview</span>
            </motion.div>
          </div>
        )}

        {/* 4. Small Disable Interaction (Lock Sandbox) Button */}
        {mounted && !isCompact && interactive && !loading && !failed && (
          <button
            onClick={() => setInteractive(false)}
            className="absolute bottom-3 right-3 z-30 px-3 py-1.5 rounded-lg bg-neutral-950/95 border border-white/10 hover:border-white/20 text-[9px] font-mono text-neutral-300 hover:text-white shadow-lg flex items-center gap-1.5 transition-all cursor-pointer select-none"
          >
            <Lock className="h-3 w-3 text-neutral-400" />
            <span>Disable interaction</span>
          </button>
        )}

        {/* 5. Fallback Error Card UI */}
        {failed && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-neutral-950 text-center select-none">
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center border mb-3 shrink-0"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}25`,
                color: accentColor,
              }}
            >
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-white tracking-wide uppercase font-mono mb-1">{title}</h4>
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">
              Live preview unavailable
            </p>
            <div className="flex gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1"
              >
                <span>Open Live Site</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                onClick={retryLoad}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-[10px] font-mono text-neutral-400 hover:text-neutral-200 uppercase tracking-wider transition-all flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Retry</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
