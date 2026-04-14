"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

gsap.registerPlugin(ScrollTrigger);

function ParallaxBlock({
  speed,
  className,
  image,
}: {
  speed: number;
  className: string;
  image?: string | null;
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
      <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
        {image && (
          <Image src={image} alt="" fill className="object-cover" sizes="50vw" />
        )}
      </div>
    </div>
  );
}

interface Props {
  images?: (string | null | undefined)[];
}

export function ParallaxShowcase({ images = [] }: Props) {
  const t = useTranslations("home");

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      {/* Ghost text behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[5rem] sm:text-[8rem] md:text-[20rem] font-bold text-white/[0.02] leading-none">
          DRXP
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Mobile: compact grid (no parallax to avoid huge tiles) */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {images.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className={`relative aspect-[3/4] bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden ${
                i === 0 ? "col-span-2 aspect-[16/10]" : ""
              }`}
            >
              {img && (
                <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
              )}
            </div>
          ))}
        </div>

        {/* Desktop: absolute positioned parallax */}
        <div className="relative h-[70vh] hidden md:block">
          <ParallaxBlock
            speed={0.2}
            className="absolute left-0 top-[5%] w-[45%] h-[60%]"
            image={images[0]}
          />
          <ParallaxBlock
            speed={0.4}
            className="absolute right-[5%] top-[15%] w-[35%] h-[45%]"
            image={images[1]}
          />
          <ParallaxBlock
            speed={0.6}
            className="absolute left-[30%] bottom-[5%] w-[25%] h-[35%]"
            image={images[2]}
          />
        </div>
      </div>

      {/* Section label */}
      <AnimatedSection className="mt-10 md:mt-16 text-center">
        <p className="text-xs tracking-[0.4em] text-white/20 uppercase">
          {t("craftedWithPrecision")}
        </p>
      </AnimatedSection>
    </section>
  );
}
