"use client";

import Link from "next/link";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const featured = {
  slug: "the-art-of-minimal-streetwear",
  title: "The Art of Minimal Streetwear",
  date: "March 28, 2025",
  excerpt:
    "Exploring the intersection of restraint and rebellion, where every seam is intentional and silence speaks louder than noise.",
};

const posts = [
  {
    slug: "behind-the-collection-ss25",
    title: "Behind the Collection: SS25",
    date: "March 15, 2025",
    excerpt: "A look inside the creative process that shaped our latest seasonal offering.",
  },
  {
    slug: "material-matters-premium-cotton",
    title: "Material Matters: Premium Cotton",
    date: "February 22, 2025",
    excerpt: "Why we source only the finest long-staple cotton for every DRXP garment.",
  },
  {
    slug: "street-culture-tokyo",
    title: "Street Culture Tokyo",
    date: "February 8, 2025",
    excerpt: "Dispatches from Harajuku and beyond \u2014 the pulse of Japanese street fashion.",
  },
  {
    slug: "drxp-studio-tour",
    title: "DRXP Studio Tour",
    date: "January 20, 2025",
    excerpt: "Step inside our Moscow atelier where ideas become garments.",
  },
];

export default function JournalPage() {
  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <AnimatedSection>
        <SplitText
          text="JOURNAL"
          as="h1"
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-16"
        />
      </AnimatedSection>

      {/* Featured post */}
      <AnimatedSection>
        <Link href={`/journal/${featured.slug}`} className="group block mb-20">
          <div className="relative aspect-[21/9] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <span className="text-xs tracking-widest text-white/50 mb-3">{featured.date}</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                {featured.title}
              </h2>
              <p className="mt-3 text-white/60 max-w-xl text-sm leading-relaxed">
                {featured.excerpt}
              </p>
            </div>
          </div>
        </Link>
      </AnimatedSection>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <AnimatedSection key={post.slug} delay={i * 0.1}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 mb-4">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <span className="text-xs tracking-widest text-white/40">{post.date}</span>
              <h3 className="text-xl font-light tracking-tight mt-2 group-hover:translate-x-1 transition-transform duration-300">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">{post.excerpt}</p>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </main>
  );
}
