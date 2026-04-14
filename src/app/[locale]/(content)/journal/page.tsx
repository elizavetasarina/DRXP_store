import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllJournalPosts } from "@/sanity/lib/queries";

interface JournalPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: { url?: string; alt?: string };
}

export default async function JournalPage() {
  const locale = await getLocale();
  const t = await getTranslations("journal");
  const posts: JournalPost[] = await getAllJournalPosts(locale);
  const [featured, ...rest] = posts;

  return (
    <main className="pt-24 md:pt-32 px-6 md:px-10 min-h-screen bg-black text-white pb-20">
      <AnimatedSection>
        <SplitText
          text="JOURNAL"
          as="h1"
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-10 md:mb-16"
        />
      </AnimatedSection>

      {!featured ? (
        <p className="text-white/30 text-sm tracking-widest uppercase">{t("noPosts")}</p>
      ) : (
        <>
          {/* Featured post */}
          <AnimatedSection>
            <Link href={`/journal/${featured.slug}`} className="group block mb-12 md:mb-20">
              <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
                {featured.coverImage?.url && (
                  <Image
                    src={featured.coverImage.url}
                    alt={featured.coverImage.alt || featured.title || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="100vw"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12">
                  <span className="text-[10px] md:text-xs tracking-widest text-white/50 mb-2 md:mb-3">
                    {featured.publishedAt
                      ? new Date(featured.publishedAt).toLocaleDateString()
                      : ""}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="mt-2 md:mt-3 text-white/60 max-w-xl text-xs sm:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                      {featured.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </AnimatedSection>

          {/* Post grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {rest.map((post, i) => (
              <AnimatedSection key={post._id} delay={i * 0.1}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 mb-3 md:mb-4">
                    {post.coverImage?.url && (
                      <Image
                        src={post.coverImage.url}
                        alt={post.coverImage.alt || post.title || ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <span className="text-[10px] md:text-xs tracking-widest text-white/40">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : ""}
                  </span>
                  <h3 className="text-lg md:text-xl font-light tracking-tight mt-1.5 md:mt-2 group-hover:translate-x-1 transition-transform duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-white/50 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  )}
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
