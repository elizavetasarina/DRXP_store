"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);

  const firstVariantInStock = product.variants.find((v) => v.stock > 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariantInStock) return;
    addItem({
      productId: product.id,
      variantId: firstVariantInStock.id,
      name: product.name,
      price: product.price,
      size: firstVariantInStock.size,
      color: firstVariantInStock.color,
      image: product.images[0]?.url ?? "",
    });
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url ?? "",
    });
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 bg-gradient-to-br from-neutral-900 to-neutral-800" />

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 transition-opacity opacity-0 group-hover:opacity-100"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isInWishlist ? "fill-white text-white" : "text-white/70 hover:text-white"
            }`}
          />
        </button>

        {/* Quick add overlay */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={handleQuickAdd}
            disabled={!firstVariantInStock}
            className="w-full text-[10px] tracking-[0.2em] uppercase text-white py-2 border border-white/30 hover:bg-white hover:text-black transition-colors disabled:opacity-40"
          >
            {firstVariantInStock ? "Quick Add" : "Sold Out"}
          </button>
        </motion.div>

        {/* Sale badge */}
        {product.comparePrice && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-white text-black px-2 py-0.5">
            Sale
          </span>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm tracking-wider uppercase text-white/80 truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-xs text-white/30 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
