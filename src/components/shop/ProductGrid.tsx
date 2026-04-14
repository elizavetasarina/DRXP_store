"use client";

import { useTranslations } from "next-intl";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  const t = useTranslations("shop");

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm tracking-widest uppercase text-white/40">
          {t("noProducts")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, i) => (
        <AnimatedSection key={product.id} delay={i * 0.05}>
          <ProductCard product={product} />
        </AnimatedSection>
      ))}
    </div>
  );
}
