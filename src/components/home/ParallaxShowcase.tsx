"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

gsap.registerPlugin(ScrollTrigger);

function ParallaxBlock({
  speed,
  className,
}: {
  speed: number;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const yDistance = speed * 100;
    gsap.set(el, { yPercent: -yDistance / 2 });

    const tween = gsap.to(el, {
      yPercent: yDistance / 2,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
    </div>
  );
}

export function ParallaxShowcase() {
  return (
    <section className="py-32 relative overflow-hidden min-h-[80vh]">
      {/* Ghost text behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[12rem] md:text-[20rem] font-bold text-white/[0.02] leading-none">
          DRXP
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative h-[70vh]">
          {/* Block 1 - large, left */}
          <ParallaxBlock
            speed={0.2}
            className="absolute left-0 top-[5%] w-[45%] h-[60%]"
          />

          {/* Block 2 - medium, right offset */}
          <ParallaxBlock
            speed={0.4}
            className="absolute right-[5%] top-[15%] w-[35%] h-[45%]"
          />

          {/* Block 3 - small, center-bottom */}
          <ParallaxBlock
            speed={0.6}
            className="absolute left-[30%] bottom-[5%] w-[25%] h-[35%]"
          />
        </div>
      </div>

      {/* Section label */}
      <AnimatedSection className="mt-16 text-center">
        <p className="text-xs tracking-[0.4em] text-white/20 uppercase">
          Crafted with precision
        </p>
      </AnimatedSection>
    </section>
  );
}
