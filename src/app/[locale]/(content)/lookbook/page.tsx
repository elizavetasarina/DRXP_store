"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const collections = [
  { slug: "ss25-drop-01", name: "SS25 DROP 01", items: 12 },
  { slug: "essentials", name: "ESSENTIALS", items: 8 },
  { slug: "archive", name: "ARCHIVE", items: 16 },
];

export default function LookbookPage() {
  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <AnimatedSection>
        <SplitText
          text="LOOKBOOK"
          as="h1"
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-16"
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col, i) => (
          <AnimatedSection key={col.slug} delay={i * 0.15}>
            <Link href={`/lookbook/${col.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="text-2xl md:text-3xl font-bold tracking-tight"
                    initial={{ y: 0 }}
                    whileHover={{ y: -4 }}
                  >
                    {col.name}
                  </motion.span>
                  <span className="mt-2 text-xs tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
                    {col.items} LOOKS
                  </span>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </main>
  );
}
