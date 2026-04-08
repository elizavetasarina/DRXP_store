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
    <section className="py-32 px-6 md:px-10 space-y-32">
      {blocks.map((block, idx) => {
        const reverse = idx % 2 === 1;
        return (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center"
          >
            <AnimatedSection
              direction={reverse ? "left" : "left"}
              delay={reverse ? 0.1 : 0}
              className={`md:col-span-2 flex flex-col justify-center ${
                reverse ? "order-2 md:order-1" : ""
              }`}
            >
              {block.quote && (
                <blockquote className="font-serif text-2xl md:text-4xl leading-relaxed text-white/80">
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

            <AnimatedSection
              direction="right"
              className={`md:col-span-3 ${reverse ? "order-1 md:order-2" : ""}`}
            >
              <div className="aspect-[2/3] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 relative overflow-hidden">
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
