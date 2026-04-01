"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show cursors
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const pos = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.set(dot, { x: pos.x, y: pos.y });
      gsap.to(ring, { x: pos.x, y: pos.y, duration: 0.35, ease: "power3.out" });
    };

    const grow = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const shrink = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const addListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      );
      targets.forEach((el) => {
        (el as HTMLElement).style.cursor = "none";
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
      return targets;
    };

    window.addEventListener("mousemove", onMove);

    let targets = addListeners();

    // Re-apply on DOM changes
    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      targets = addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document.documentElement.style.cursor = "";
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference opacity-0"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference opacity-0"
      />
    </>
  );
}
