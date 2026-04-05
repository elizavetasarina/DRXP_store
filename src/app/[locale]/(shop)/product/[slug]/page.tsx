"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PRODUCTS } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { VariantSelector } from "@/components/product/VariantSelector";
import { AddToCart } from "@/components/product/AddToCart";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations("product");
  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const selectedVariant = useMemo(() => {
    if (!product || !selectedSize) return null;
    return (
      product.variants.find(
        (v) =>
          v.size === selectedSize &&
          (!selectedColor || v.color === selectedColor) &&
          v.stock > 0
      ) ?? null
    );
  }, [product, selectedSize, selectedColor]);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
        <p className="text-sm tracking-widest uppercase text-white/40">
          {t("notFound")}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Gallery — 55% */}
          <div className="md:col-span-7">
            <AnimatedSection>
              <ImageGallery images={product.images} />
            </AnimatedSection>
          </div>

          {/* Info — 45% */}
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

        <RelatedProducts
          currentProductId={product.id}
          categoryId={product.categoryId}
        />
      </div>
    </main>
  );
}
