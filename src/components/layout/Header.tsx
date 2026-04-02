"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { toggleMenu, openCart } = useUIStore();
  const cartItems = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Left — Menu */}
        <button
          onClick={toggleMenu}
          className="flex flex-col gap-1.5 w-8 group"
          aria-label="Open menu"
        >
          <span className="block h-px w-6 bg-white transition-all duration-300 group-hover:w-8" />
          <span className="block h-px w-8 bg-white transition-all duration-300 group-hover:w-6" />
        </button>

        {/* Center — Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-white text-xl md:text-2xl font-bold tracking-[0.3em] uppercase"
        >
          DRXP
        </Link>

        {/* Right — Icons */}
        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-white/70 hover:text-white transition-colors">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <Link href="/account/wishlist" className="relative text-white/70 hover:text-white transition-colors">
            <Heart className="w-5 h-5" strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-black text-[10px] rounded-full flex items-center justify-center font-medium">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button onClick={openCart} className="relative text-white/70 hover:text-white transition-colors" aria-label="Open cart">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-black text-[10px] rounded-full flex items-center justify-center font-medium">
                {cartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
