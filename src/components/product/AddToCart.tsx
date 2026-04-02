"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product, ProductVariant } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface Props {
  product: Product;
  selectedVariant: ProductVariant | null;
}

export function AddToCart({ product, selectedVariant }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const [clicked, setClicked] = useState(false);

  const handleAdd = () => {
    if (!selectedVariant) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: product.price,
      size: selectedVariant.size,
      color: selectedVariant.color ?? "",
      image: product.images[0]?.url ?? "",
    });
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    openCart();
  };

  const handleWishlist = () => {
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url ?? "",
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAdd}
        disabled={!selectedVariant}
        className={`w-full bg-white text-black py-4 text-sm tracking-[0.2em] uppercase transition-all ${
          !selectedVariant ? "opacity-50 cursor-not-allowed" : "hover:bg-white/90 active:scale-[0.98]"
        } ${clicked ? "scale-[0.97]" : ""}`}
      >
        {selectedVariant ? "Add to Cart" : "Select a Size"}
      </button>

      <button
        onClick={handleWishlist}
        className="flex items-center justify-center gap-2 w-full py-2 text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
      >
        <Heart className={`w-3.5 h-3.5 ${isInWishlist ? "fill-white text-white" : ""}`} />
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
}
