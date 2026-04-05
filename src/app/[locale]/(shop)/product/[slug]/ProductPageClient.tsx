"use client";

import { useState, useMemo } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { VariantSelector } from "@/components/product/VariantSelector";
import { AddToCart } from "@/components/product/AddToCart";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageClient({ product, relatedProducts }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const selectedVariant = useMemo(() => {
    if (!selectedSize) return null;
    return (
      product.variants.find(
        (v) =>
          v.size === selectedSize &&
          (!selectedColor || v.color === selectedColor) &&
          v.stock > 0
      ) ?? null
    );
  }, [product, selectedSize, selectedColor]);

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Gallery */}
          <div className="md:col-span-7">
            <AnimatedSection>
              <ImageGallery images={product.images} />
            </AnimatedSection>
          </div>

          {/* Info */}
          <div className="md:col-span-5 space-y-8">
            <AnimatedSection delay={0.1}>
              <ProductInfo product={product} />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <VariantSelector
                variants={product.variants}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <AddToCart product={product} selectedVariant={selectedVariant} />
            </AnimatedSection>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-8">
              Related
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <a key={p.id} href={`/product/${p.slug}`} className="group block">
                  <div className="aspect-[3/4] bg-neutral-900 mb-3 overflow-hidden">
                    {p.images[0]?.url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.images[0].url}
                        alt={p.images[0].alt ?? p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <p className="text-xs tracking-wider truncate">{p.name}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
