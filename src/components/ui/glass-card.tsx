"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  showGlow?: boolean;
}

export default function GlassCard({
  children,
  className,
  glowColor,
  showGlow = true,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = usePortfolioStore();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const currentGlow = glowColor || theme.accentHex;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={cn(
        "relative rounded-2xl overflow-hidden glass-card p-6 border border-white/[0.03] transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Interactive Radial Shine */}
      {showGlow && isFocused && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${currentGlow}33, transparent 80%)`,
          }}
        />
      )}
      
      {/* Light Border Accent */}
      {showGlow && isFocused && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
          style={{
            border: `1.5px solid ${currentGlow}33`,
            maskImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
          }}
        />
      )}

      {children}
    </div>
  );
}
