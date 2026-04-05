"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const collectionData: Record<string, { name: string; images: { aspect: string }[] }> = {
  "ss25-drop-01": {
    name: "SS25 DROP 01",
    images: [
      { aspect: "aspect-[3/4]" },
      { aspect: "aspect-[4/5]" },
      { aspect: "aspect-[1/1]" },
      { aspect: "aspect-[3/4]" },
      { aspect: "aspect-[4/5]" },
      { aspect: "aspect-[1/1]" },
      { aspect: "aspect-[3/4]" },
      { aspect: "aspect-[4/5]" },
    ],
  },
  essentials: {
    name: "ESSENTIALS",
    images: [
      { aspect: "aspect-[4/5]" },
      { aspect: "aspect-[1/1]" },
      { aspect: "aspect-[3/4]" },
      { aspect: "aspect-[4/5]" },
      { aspect: "aspect-[3/4]" },
      { aspect: "aspect-[1/1]" },
    ],
  },
  archive: {
    name: "ARCHIVE",
    images: [
      { aspect: "aspect-[3/4]" },
      { aspect: "aspect-[1/1]" },
      { aspect: "aspect-[4/5]" },
      { aspect: "aspect-[3/4]" },
      { aspect: "aspect-[1/1]" },
      { aspect: "aspect-[4/5]" },
      { aspect: "aspect-[3/4]" },
      { aspect: "aspect-[1/1]" },
    ],
  },
};

export default function LookbookCollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collectionData[slug] ?? { name: slug?.toUpperCase() ?? "", images: [] };

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <AnimatedSection>
        <Link
          href="/lookbook"
          className="inline-flex items-center gap-2 text-xs tracking-widest text-white/50 hover:text-white transition-colors mb-10"
        >
          &larr; BACK TO LOOKBOOK
        </Link>
      </AnimatedSection>

      <AnimatedSection>
        <SplitText
          text={collection.name}
          as="h1"
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-16"
        />
      </AnimatedSection>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {collection.images.map((img, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <motion.div
              className={`relative ${img.aspect} overflow-hidden break-inside-avoid bg-gradient-to-br from-neutral-900 to-neutral-800`}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-[10px] tracking-widest text-white/30">
                  LOOK {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </main>
  );
}
