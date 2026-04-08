import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getAllJournalPosts } from "@/sanity/lib/queries";
import type { SanityJournalPost } from "@/types/sanity";

export default async function JournalPage() {
  const posts: SanityJournalPost[] = await getAllJournalPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <AnimatedSection>
        <SplitText
          text="JOURNAL"
          as="h1"
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-16"
        />
      </AnimatedSection>

      {!featured ? (
        <p className="text-white/30 text-sm tracking-widest uppercase">No posts yet</p>
      ) : (
        <>
          {/* Featured post */}
          <AnimatedSection>
            <Link href={`/journal/${featured.slug}`} className="group block mb-20">
              <div className="relative aspect-[21/9] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
                {featured.coverImage?.url && (
                  <Image
                    src={featured.coverImage.url}
                    alt={featured.coverImage.alt ?? featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="100vw"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <span className="text-xs tracking-widest text-white/50 mb-3">
                    {featured.publishedAt
                      ? new Date(featured.publishedAt).toLocaleDateString()
                      : ""}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="mt-3 text-white/60 max-w-xl text-sm leading-relaxed">
                      {featured.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </AnimatedSection>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((post, i) => (
              <AnimatedSection key={post._id} delay={i * 0.1}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 mb-4">
                    {post.coverImage?.url && (
                      <Image
                        src={post.coverImage.url}
                        alt={post.coverImage.alt ?? post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <span className="text-xs tracking-widest text-white/40">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : ""}
                  </span>
                  <h3 className="text-xl font-light tracking-tight mt-2 group-hover:translate-x-1 transition-transform duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">{post.excerpt}</p>
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
