import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getAllLookbooks } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityLookbook } from "@/types/sanity";

export default async function LookbookPage() {
  const lookbooks: SanityLookbook[] = await getAllLookbooks();

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <AnimatedSection>
        <SplitText
          text="LOOKBOOK"
          as="h1"
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-16"
        />
      </AnimatedSection>

      {lookbooks.length === 0 ? (
        <p className="text-white/30 text-sm tracking-widest uppercase">No collections yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lookbooks.map((col, i) => {
            const cover = col.images?.[0];
            const coverUrl = cover?.asset ? urlFor(cover).width(600).url() : null;

            return (
              <AnimatedSection key={col._id} delay={i * 0.15}>
                <Link href={`/lookbook/${col.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
                    {coverUrl && (
                      <Image
                        src={coverUrl}
                        alt={cover?.alt ?? col.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold tracking-tight">
                        {col.title}
                      </span>
                      {col.images && (
                        <span className="mt-2 text-xs tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
                          {col.images.length} LOOKS
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      )}
    </main>
  );
}
