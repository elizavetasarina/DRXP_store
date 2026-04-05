"use client";

import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function EditorialStrip() {
  return (
    <section className="py-32 px-6 md:px-10 space-y-32">
      {/* Row 1: Image left, text right */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        <AnimatedSection direction="left" className="md:col-span-3">
          <div className="aspect-[2/3] bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.2} className="md:col-span-2 flex flex-col justify-center">
          <blockquote className="font-serif text-2xl md:text-4xl leading-relaxed text-white/80">
            Where architecture meets fashion. Raw, uncompromising, essential.
          </blockquote>
          <div className="mt-10">
            <div className="h-px w-16 bg-white/20" />
            <p className="mt-6 text-xs tracking-[0.3em] text-white/40 uppercase">
              SS25 Collection
            </p>
            <Link
              href="/collections"
              className="mt-3 inline-block text-sm tracking-[0.2em] text-[var(--color-accent)] uppercase hover:text-white transition-colors duration-300"
            >
              Discover
            </Link>
          </div>
        </AnimatedSection>
      </div>

      {/* Row 2: Text left, image right */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        <AnimatedSection direction="left" delay={0.1} className="md:col-span-2 flex flex-col justify-center order-2 md:order-1">
          <blockquote className="font-serif text-2xl md:text-4xl leading-relaxed text-white/80">
            Every silhouette tells a story. Every thread has intention.
          </blockquote>
          <div className="mt-10">
            <div className="h-px w-16 bg-white/20" />
            <p className="mt-6 text-xs tracking-[0.3em] text-white/40 uppercase">
              Design Philosophy
            </p>
            <Link
              href="/about"
              className="mt-3 inline-block text-sm tracking-[0.2em] text-[var(--color-accent)] uppercase hover:text-white transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" className="md:col-span-3 order-1 md:order-2">
          <div className="aspect-[2/3] bg-gradient-to-bl from-neutral-900 via-neutral-850 to-neutral-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
