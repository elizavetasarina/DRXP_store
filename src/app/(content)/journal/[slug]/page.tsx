import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const articles: Record<string, { title: string; date: string; readTime: string }> = {
  "the-art-of-minimal-streetwear": {
    title: "The Art of Minimal Streetwear",
    date: "March 28, 2025",
    readTime: "5 min read",
  },
  "behind-the-collection-ss25": {
    title: "Behind the Collection: SS25",
    date: "March 15, 2025",
    readTime: "4 min read",
  },
  "material-matters-premium-cotton": {
    title: "Material Matters: Premium Cotton",
    date: "February 22, 2025",
    readTime: "6 min read",
  },
  "street-culture-tokyo": {
    title: "Street Culture Tokyo",
    date: "February 8, 2025",
    readTime: "7 min read",
  },
  "drxp-studio-tour": {
    title: "DRXP Studio Tour",
    date: "January 20, 2025",
    readTime: "5 min read",
  },
};

const relatedSlugs = ["behind-the-collection-ss25", "material-matters-premium-cotton", "street-culture-tokyo"];

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug] ?? {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    date: "2025",
    readTime: "5 min read",
  };

  const related = relatedSlugs.filter((s) => s !== slug).slice(0, 2);

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs tracking-widest text-white/50 hover:text-white transition-colors mb-10"
          >
            &larr; BACK TO JOURNAL
          </Link>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection>
          <div className="mb-10">
            <div className="flex items-center gap-4 text-xs tracking-widest text-white/40 mb-6">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{article.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              {article.title}
            </h1>
          </div>
        </AnimatedSection>

        {/* Hero image */}
        <AnimatedSection>
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-neutral-900 to-neutral-800 mb-14" />
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection>
          <div className="space-y-6 text-lg leading-relaxed text-white/70">
            <p>
              There is a quiet revolution happening at the intersection of streetwear and minimalism.
              Where once the loudest graphics and the most saturated palettes commanded attention, a
              new generation of designers is stripping away excess to reveal something more enduring
              — garments that speak through cut, weight, and proportion rather than ornamentation.
            </p>

            <p>
              At DRXP, this philosophy is not a trend to be followed but a conviction held from the
              very beginning. Every piece in the collection is born from a simple question: what
              remains when you remove everything unnecessary? The answer, season after season, is a
              wardrobe that feels both timeless and unmistakably contemporary.
            </p>

            <blockquote className="border-l-2 border-white/20 pl-6 my-10 text-2xl md:text-3xl font-serif italic text-white/90 leading-snug">
              &ldquo;True luxury is the absence of noise.&rdquo;
            </blockquote>

            <p>
              The SS25 collection pushes this ethos further, introducing fabrics that have been
              developed over eighteen months — heavyweight organic cotton with a hand-brushed finish,
              and a proprietary nylon blend that moves like silk but endures like armour. Each
              material was chosen not for spectacle but for the way it ages, developing character
              with every wear.
            </p>

            <p>
              Silhouettes are intentionally oversized yet precise, balancing volume with structure so
              that each piece drapes with purpose. Colourways stay within the DRXP vocabulary —
              obsidian, ash, bone, and a single seasonal accent in muted indigo. It is restraint
              elevated to an art form, and it is the reason the collection resonates with those who
              understand that what you leave out matters as much as what you put in.
            </p>
          </div>
        </AnimatedSection>

        {/* Related */}
        <AnimatedSection>
          <div className="mt-20 pt-10 border-t border-white/10">
            <h2 className="text-xs tracking-widest text-white/40 mb-8">RELATED ARTICLES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((s) => {
                const a = articles[s];
                return (
                  <Link
                    key={s}
                    href={`/journal/${s}`}
                    className="group block"
                  >
                    <div className="aspect-[16/10] bg-gradient-to-br from-neutral-900 to-neutral-800 mb-3" />
                    <span className="text-xs tracking-widest text-white/40">{a?.date}</span>
                    <h3 className="text-lg font-light mt-1 group-hover:translate-x-1 transition-transform duration-300">
                      {a?.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
