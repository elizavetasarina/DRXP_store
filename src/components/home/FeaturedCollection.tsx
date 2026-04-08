import Image from "next/image";
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
  const featured: SanityFeatured[] = await getFeaturedProducts();

  if (!featured || featured.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-10">
      <AnimatedSection className="mb-16">
        <h2 className="text-6xl md:text-8xl font-bold text-white/5 leading-none">
          FEATURED
        </h2>
        <p className="mt-4 text-2xl font-light text-white/80">
          Selected Pieces
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((product, i) => {
          const cover = product.images?.[0];
          return (
            <AnimatedSection
              key={product._id}
              delay={i * 0.15}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <Link
                href={`/product/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
                  {cover?.url && (
                    <Image
                      src={cover.url}
                      alt={cover.alt ?? product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm tracking-wider text-white/60 uppercase">
                          {product.name}
                        </p>
                      </div>
                      <p className="text-sm text-white/40">
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
