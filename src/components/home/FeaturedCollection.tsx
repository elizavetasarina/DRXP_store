import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getFeaturedProducts } from "@/sanity/lib/queries";
import { formatPrice } from "@/lib/utils";

interface SanityFeatured {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images?: { url?: string; alt?: string }[];
}

export async function FeaturedCollection() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const featured: SanityFeatured[] = await getFeaturedProducts(locale);

  if (!featured || featured.length === 0) return null;

  return (
    <section className="py-12 md:py-20 px-6 md:px-10">
      <AnimatedSection className="mb-8 md:mb-12">
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white/5 leading-none">
          {t("featured")}
        </h2>
        <p className="mt-3 md:mt-4 text-lg md:text-2xl font-light text-white/80">
          {t("selectedPieces")}
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {featured.map((product, i) => {
          const cover = product.images?.[0];
          return (
            <AnimatedSection key={product._id} delay={i * 0.1}>
              <Link href={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
                  {cover?.url && (
                    <Image
                      src={cover.url}
                      alt={cover.alt || product.name || ""}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-end justify-between gap-2">
                      <p className="text-xs tracking-wider text-white/70 uppercase leading-tight">
                        {product.name}
                      </p>
                      <p className="text-xs text-white/40 shrink-0">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
