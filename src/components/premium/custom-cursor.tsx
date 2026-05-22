"use client";

import { useEffect, useState, useRef } from "react";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const { theme } = usePortfolioStore();

  const trailRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
      if (!isTouch) {
        document.documentElement.classList.add("cursor-none-all");
      }
    };
    
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.closest(".interactive-cursor") ||
        target.style.cursor === "pointer";
      
      setIsHovering(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Smooth cursor trail using requestAnimationFrame lerp
  useEffect(() => {
    if (isTouchDevice) return;

    const animateTrail = () => {
      const targetX = position.x;
      const targetY = position.y;
      
      // Interpolate position (0.15 represents the follow speed)
      trailRef.current.x += (targetX - trailRef.current.x) * 0.16;
      trailRef.current.y += (targetY - trailRef.current.y) * 0.16;
      
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isTouchDevice]);

  // Inject cursor CSS overrides
  useEffect(() => {
    if (isTouchDevice) return;
    const style = document.createElement("style");
    style.innerHTML = `
      .cursor-none-all, .cursor-none-all * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  const accentColor = theme.accentHex;

  return (
    <>
      {/* Outer Halo */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-9999 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-transform duration-150 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isHovering ? "48px" : "28px",
          height: isHovering ? "48px" : "28px",
          borderColor: accentColor,
          backgroundColor: isHovering ? `${accentColor}11` : "transparent",
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          boxShadow: theme.glowEnabled ? `0 0 15px ${accentColor}33` : "none",
        }}
      />
      {/* Inner Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-9999 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "6px",
          height: "6px",
          backgroundColor: accentColor,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
    </>
  );
}
