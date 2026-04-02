import { PRODUCTS } from "@/lib/constants";
import { ProductCard } from "@/components/shop/ProductCard";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface Props {
  currentProductId: string;
  categoryId: string;
}

export function RelatedProducts({ currentProductId, categoryId }: Props) {
  const related = PRODUCTS.filter(
    (p) => p.categoryId === categoryId && p.id !== currentProductId
  ).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-24">
      <AnimatedSection>
        <h2 className="text-xs tracking-[0.3em] uppercase text-white/50 mb-8">
          You May Also Like
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {related.map((product, i) => (
          <AnimatedSection key={product.id} delay={i * 0.05}>
            <ProductCard product={product} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
