"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationContextValue {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const AnimationContext = createContext<AnimationContextValue | null>(null);

export function useAnimation() {
  const ctx = useContext(AnimationContext);
  if (!ctx) throw new Error("useAnimation must be used within AnimationProvider");
  return ctx;
}

export function AnimationProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Enable native smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Sync ScrollTrigger on each frame for smooth updates
    const update = () => {
      ScrollTrigger.update();
      rafId.current = requestAnimationFrame(update);
    };
    rafId.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.documentElement.style.scrollBehavior = "";
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <AnimationContext.Provider value={{ scrollRef }}>
      <div ref={scrollRef}>{children}</div>
    </AnimationContext.Provider>
  );
}
