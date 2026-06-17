"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export interface EditorialBlock {
  image?: string | null;
  quote?: string | null;
  label?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

interface Props {
  blocks?: EditorialBlock[];
}

export function EditorialStrip({ blocks = [] }: Props) {
  if (blocks.length === 0) return null;

  return (
    <section>
      {blocks.map((block, idx) => {
        const imageLeft = idx % 2 === 1;

        return (
          <div
            key={idx}
            className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-64px)]"
          >
            {/* Text side */}
            <AnimatedSection
              direction="left"
              delay={0}
              className={`flex flex-col justify-center px-8 md:px-16 py-16 md:py-0 w-full md:w-2/5 bg-black ${
                imageLeft ? "md:order-2" : "md:order-1"
              }`}
            >
              {block.quote && (
                <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl xl:text-4xl leading-relaxed text-white/80">
                  {block.quote}
                </blockquote>
              )}
              {(block.label || block.ctaLabel) && (
                <div className="mt-10">
                  <div className="h-px w-16 bg-white/20" />
                  {block.label && (
                    <p className="mt-6 text-xs tracking-[0.3em] text-white/40 uppercase">
                      {block.label}
                    </p>
                  )}
                  {block.ctaLabel && block.ctaHref && (
                    <Link
                      href={block.ctaHref}
                      className="mt-3 inline-block text-sm tracking-[0.2em] text-[var(--color-accent)] uppercase hover:text-white transition-colors duration-300"
                    >
                      {block.ctaLabel}
                    </Link>
                  )}
                </div>
              )}
            </AnimatedSection>

            {/* Image side */}
            <AnimatedSection
              direction="right"
              className={`relative w-full md:w-3/5 h-[60vw] md:h-full ${
                imageLeft ? "md:order-1" : "md:order-2"
              }`}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 overflow-hidden">
                {block.image && (
                  <Image
                    src={block.image}
                    alt={block.label || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        );
      })}
    </section>
  );
}
