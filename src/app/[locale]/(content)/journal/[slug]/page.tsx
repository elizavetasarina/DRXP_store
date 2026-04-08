import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getJournalPostBySlug, getAllJournalPosts } from "@/sanity/lib/queries";
import type { SanityJournalPost } from "@/types/sanity";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts: SanityJournalPost[] = await getAllJournalPosts();
  const locales = ["ru", "en"];
  return locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post: SanityJournalPost | null = await getJournalPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
        <p className="text-sm tracking-widest uppercase text-white/40">Article not found</p>
      </main>
    );
  }

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

        <AnimatedSection>
          <div className="mb-10">
            <div className="flex items-center gap-4 text-xs tracking-widest text-white/40 mb-6">
              {post.publishedAt && (
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </AnimatedSection>

        {/* Cover image */}
        <AnimatedSection>
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 mb-14">
            {post.coverImage?.url && (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt ?? post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            )}
          </div>
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection>
          {post.excerpt && (
            <p className="text-lg leading-relaxed text-white/70 mb-8">{post.excerpt}</p>
          )}
          {/* Rich text body will be rendered here when @portabletext/react is added */}
        </AnimatedSection>
      </div>
    </main>
  );
}
