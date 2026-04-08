import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getLookbookBySlug, getAllLookbooks } from "@/sanity/lib/queries";

interface LookbookCollection {
  _id: string;
  title: string;
  slug: string;
  images?: { url?: string; alt?: string }[];
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const lookbooks: LookbookCollection[] = await getAllLookbooks("ru");
  const locales = ["ru", "en"];
  return locales.flatMap((locale) =>
    lookbooks.map((l) => ({ locale, slug: l.slug }))
  );
}

export default async function LookbookCollectionPage({ params }: Props) {
  const { slug, locale } = await params;
  const collection: LookbookCollection | null = await getLookbookBySlug(slug, locale);

  if (!collection) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
        <p className="text-sm tracking-widest uppercase text-white/40">Collection not found</p>
      </main>
    );
  }

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
          text={collection.title}
          as="h1"
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-16"
        />
      </AnimatedSection>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {(collection.images ?? []).map((img, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <div className="relative aspect-[3/4] overflow-hidden break-inside-avoid bg-gradient-to-br from-neutral-900 to-neutral-800">
              {img.url && (
                <Image
                  src={img.url}
                  alt={img.alt || `Look ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-[10px] tracking-widest text-white/30">
                  LOOK {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </main>
  );
}
