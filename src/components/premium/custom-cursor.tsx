"use client";

import { useEffect, useState, useRef } from "react";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const { theme } = usePortfolioStore();

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
      if (!isTouch) {
        document.documentElement.classList.add("cursor-none-all");
      }
    };
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
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

  useEffect(() => {
    if (isTouchDevice) return;

    const updateCursor = () => {
      if (cursorRef.current) {
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.25;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.25;
        
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    requestRef.current = requestAnimationFrame(updateCursor);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isTouchDevice]);

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
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="flex items-center justify-center rounded-full border transition-all duration-150 ease-out"
        style={{
          width: isHovering ? "48px" : "28px",
          height: isHovering ? "48px" : "28px",
          borderColor: accentColor,
          backgroundColor: isHovering ? `${accentColor}11` : "transparent",
          transform: `scale(${isClicking ? 0.8 : 1})`,
          boxShadow: theme.glowEnabled ? `0 0 15px ${accentColor}33` : "none",
        }}
      >
        <div
          className="rounded-full transition-transform duration-100 ease-out shrink-0"
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: accentColor,
            transform: `scale(${isHovering ? 1.5 : 1})`,
          }}
        />
      </div>
    </div>
  );
}
