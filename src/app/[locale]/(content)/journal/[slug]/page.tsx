import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getJournalPostBySlug, getAllJournalPosts } from "@/sanity/lib/queries";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface JournalPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: { url?: string; alt?: string };
  body?: PortableTextBlock[];
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

/* ── Portable Text components for journal body ── */
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-white/80 mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-light tracking-tight text-white mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-light tracking-tight text-white mt-10 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-white/20 pl-6 my-8 text-white/60 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 text-white/90 hover:text-white transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    journalImageRu: ({ value }) => (
      <figure className="my-10">
        {value?.asset?.asset?.url && (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
            <Image
              src={value.asset.asset.url}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
        {value?.caption && (
          <figcaption className="mt-3 text-xs tracking-widest text-white/40 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    journalImageEn: ({ value }) => (
      <figure className="my-10">
        {value?.asset?.asset?.url && (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
            <Image
              src={value.asset.asset.url}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
        {value?.caption && (
          <figcaption className="mt-3 text-xs tracking-widest text-white/40 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    // fallback for old "journalImage" type (before migration)
    journalImage: ({ value }) => (
      <figure className="my-10">
        {value?.asset?.asset?.url && (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
            <Image
              src={value.asset.asset.url}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
        {value?.caption && (
          <figcaption className="mt-3 text-xs tracking-widest text-white/40 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export async function generateStaticParams() {
  const posts: JournalPost[] = await getAllJournalPosts("ru");
  const locales = ["ru", "en"];
  return locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  const post: JournalPost | null = await getJournalPostBySlug(slug, locale);

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
        <p className="text-sm tracking-widest uppercase text-white/40">Article not found</p>
      </main>
    );
  }

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto pb-20">
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
                alt={post.coverImage.alt || post.title || ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            )}
          </div>
        </AnimatedSection>

        {/* Excerpt */}
        {post.excerpt && (
          <AnimatedSection>
            <p className="text-lg leading-relaxed text-white/60 mb-10 italic">{post.excerpt}</p>
          </AnimatedSection>
        )}

        {/* Body — Portable Text */}
        {post.body && Array.isArray(post.body) && post.body.length > 0 && (
          <AnimatedSection>
            <div className="prose-drxp">
              <PortableText value={post.body} components={ptComponents} />
            </div>
          </AnimatedSection>
        )}
      </div>
    </main>
  );
}
