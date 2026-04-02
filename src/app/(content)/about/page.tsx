"use client";

import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MarqueeText } from "@/components/shared/MarqueeText";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="h-screen flex items-center justify-center px-6">
        <SplitText
          text="ABOUT DRXP"
          as="h1"
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center"
        />
      </section>

      {/* Our Story */}
      <section className="px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="left">
            <div className="aspect-[3/4] bg-gradient-to-br from-neutral-900 to-neutral-800" />
          </AnimatedSection>
          <AnimatedSection direction="right">
            <h2 className="text-xs tracking-[0.3em] text-white/40 mb-6">OUR STORY</h2>
            <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight mb-6">
              Born in Moscow, 2024. DRXP emerged from a conviction that streetwear had become too
              loud and too disposable.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Founded by a collective of designers and artists, DRXP set out to build a different
              kind of brand — one rooted in restraint, obsessive material quality, and a deep respect
              for the craft of garment-making. Every collection is an exercise in editing: stripping
              away the superfluous to reveal pieces that endure beyond any single season.
            </p>
            <p className="text-white/60 leading-relaxed">
              Our work draws from architecture, brutalist design, and the raw energy of post-Soviet
              urban landscapes. We make clothes for people who express themselves through subtlety —
              through the weight of a fabric, the fall of a silhouette, the quiet confidence of
              wearing something that needs no explanation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 overflow-hidden">
        <AnimatedSection direction="none">
          <MarqueeText
            text="RAW. UNCOMPROMISING. ESSENTIAL."
            speed={40}
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-white/10"
          />
        </AnimatedSection>
        <div className="max-w-3xl mx-auto px-6 mt-20">
          <AnimatedSection>
            <p className="text-xl md:text-2xl font-serif italic text-white/80 leading-relaxed text-center">
              We believe that true luxury lives in the details you feel but never see — the
              invisible seam, the perfectly weighted hem, the dye that deepens with time. Our
              philosophy is simple: make less, make it better, make it last.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="left" className="order-2 lg:order-1">
            <h2 className="text-xs tracking-[0.3em] text-white/40 mb-6">CRAFTSMANSHIP</h2>
            <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight mb-6">
              Every fibre is chosen with intention. Every construction method is earned through
              iteration.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              We work exclusively with mills in Portugal and Japan, sourcing heavyweight organic
              cottons, proprietary nylon blends, and hand-finished leathers that develop character
              over years of wear. Our garments are constructed using techniques borrowed from
              tailoring and workwear — flatlock seams, bartack reinforcements, and hand-set hardware.
            </p>
            <p className="text-white/60 leading-relaxed">
              Production runs are deliberately limited. We would rather sell out than overproduce. It
              is a slower way to build a brand, but it is the only way we know to respect both the
              materials and the people who wear them.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" className="order-1 lg:order-2">
            <div className="aspect-[4/5] bg-gradient-to-br from-neutral-900 to-neutral-800" />
          </AnimatedSection>
        </div>
      </section>

      {/* The Studio */}
      <section className="px-6 md:px-10 py-24">
        <AnimatedSection>
          <h2 className="text-xs tracking-[0.3em] text-white/40 mb-10">THE STUDIO</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "aspect-[1/1]",
            "aspect-[4/5]",
            "aspect-[3/4]",
            "aspect-[1/1]",
          ].map((aspect, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                className={`${aspect} bg-gradient-to-br from-neutral-900 to-neutral-800`}
              />
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection>
          <p className="mt-10 text-white/50 max-w-xl text-sm leading-relaxed">
            Our atelier sits in the heart of Moscow, a converted industrial space where concrete
            walls meet precision cutting tables. It is where fabric samples are tested, patterns are
            drafted by hand, and every garment is inspected before it leaves the studio.
          </p>
        </AnimatedSection>
      </section>
    </main>
  );
}
