"use client";

import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const cards = [
  {
    title: "LOOKBOOK SS25",
    subtitle: "View the full collection",
    href: "/lookbook",
  },
  {
    title: "JOURNAL",
    subtitle: "Behind the latest drop",
    href: "/journal",
  },
];

export function CollectionTeaser() {
  return (
    <section className="py-32 px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <AnimatedSection key={card.href} delay={i * 0.15}>
            <Link href={card.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 transition-transform duration-500 group-hover:scale-[0.98]">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-3">
                    {card.subtitle}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {card.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-accent)] tracking-wider uppercase opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>View</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M1 7h12M8 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
