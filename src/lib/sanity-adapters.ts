import { urlFor } from "@/sanity/lib/image";
import type { SanityProduct } from "@/types/sanity";
import type { Product } from "@/types/product";

/**
 * Converts a Sanity product document to the app's Product type.
 * Keeps the rest of the app (ProductCard, ProductGrid, etc.) unchanged.
 */
export function adaptSanityProduct(p: SanityProduct): Product {
  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    description: p.description ?? "",
    price: p.price,
    comparePrice: p.comparePrice ?? null,
    categoryId: p.categorySlug ?? "",
    category: p.categorySlug
      ? { id: p.categorySlug, name: p.categoryName ?? "", slug: p.categorySlug }
      : undefined,
    images: (p.images ?? []).map((img, i) => ({
      id: img.asset?._ref ?? `img-${i}`,
      url: img.asset ? urlFor(img).width(800).url() : "",
      alt: img.alt ?? p.name,
      position: i,
    })),
    variants: (p.variants ?? []).map((v) => ({
      id: v._key,
      size: v.size,
      color: v.color ?? null,
      colorHex: null,
      sku: v.sku ?? v._key,
      stock: v.stock,
    })),
    tags: p.tags ?? [],
    isPublished: p.isPublished,
    isFeatured: p.isFeatured,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function adaptSanityProducts(products: SanityProduct[]): Product[] {
  return products.map(adaptSanityProduct);
}
