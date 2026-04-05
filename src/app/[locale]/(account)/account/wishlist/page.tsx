"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-10">
        <h1 className="text-3xl tracking-[0.2em] font-light mb-12">
          WISHLIST
        </h1>
        <p className="text-white/40 text-sm tracking-wider mb-6">
          Your wishlist is empty
        </p>
        <Link
          href="/shop"
          className="text-sm tracking-[0.15em] underline underline-offset-4 text-white/60 hover:text-white transition-colors"
        >
          BROWSE SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-10">
      <h1 className="text-3xl tracking-[0.2em] font-light mb-12">WISHLIST</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => (
          <div key={item.productId} className="group">
            {/* Image */}
            <div className="relative aspect-[3/4] bg-white/5 mb-3 overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/10 text-xs tracking-wider">
                  NO IMAGE
                </div>
              )}
            </div>

            {/* Info */}
            <h3 className="text-sm tracking-wider mb-1 truncate">
              {item.name}
            </h3>
            <p className="text-sm text-white/50 mb-3">
              {formatPrice(item.price)}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => alert("Cart not connected yet")}
                className="flex-1 bg-white text-black py-2 text-[10px] tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => removeItem(item.productId)}
                className="px-3 py-2 border border-white/10 text-[10px] tracking-wider text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
