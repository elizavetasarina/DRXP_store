"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, getTotalPrice, getDiscountedTotal, applyPromo, promoCode, removePromo } =
    useCartStore();
  const [promoInput, setPromoInput] = useState("");
  const t = useTranslations("cartDrawer");

  const total = getTotalPrice();
  const discounted = getDiscountedTotal();
  const hasDiscount = promoCode && discounted < total;

  const handlePromo = () => {
    if (!promoInput.trim()) return;
    applyPromo({ code: promoInput.toUpperCase(), discountType: "percentage", discountValue: 10 });
    setPromoInput("");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-neutral-950 flex flex-col border-l border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-white text-sm tracking-[0.2em] uppercase">
                {t("title")} ({items.length})
              </h2>
              <button onClick={closeCart} className="text-white/60 hover:text-white transition-colors" aria-label={t("closeCart")}>
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
                <ShoppingBag className="w-12 h-12 text-white/20" strokeWidth={1} />
                <div>
                  <p className="text-white text-sm tracking-[0.2em] uppercase mb-2">{t("empty")}</p>
                  <p className="text-white/40 text-sm">{t("emptyHint")}</p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="border border-white/20 text-white text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
                >
                  {t("browseShop")}
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-white/5">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 px-6 py-5">
                      {/* Image */}
                      <div className="relative w-20 h-24 bg-neutral-900 flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <p className="text-white text-sm truncate">{item.name}</p>
                          <p className="text-white/40 text-xs mt-1">
                            {item.size} / {item.color}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity */}
                          <div className="flex items-center gap-3 border border-white/10 px-1">
                            <button
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                              className="p-1 text-white/50 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-white text-xs w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                              className="p-1 text-white/50 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-white text-sm">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-white/30 hover:text-white transition-colors self-start mt-0.5"
                        aria-label={t("removeItem")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer — only when items exist */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-4">
                {/* Promo */}
                {!promoCode ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t("promoCode")}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-transparent border border-white/10 px-3 py-2 text-white text-xs tracking-wider placeholder-white/30 outline-none focus:border-white/30 transition-colors"
                    />
                    <button
                      onClick={handlePromo}
                      className="border border-white/10 text-white text-xs tracking-wider uppercase px-4 py-2 hover:bg-white hover:text-black transition-all duration-300"
                    >
                      {t("apply")}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400 tracking-wider">{t("promoApplied", { code: promoCode.code })}</span>
                    <button onClick={removePromo} className="text-white/40 hover:text-white transition-colors underline">
                      {t("removePromo")}
                    </button>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  {hasDiscount && (
                    <div className="flex justify-between text-white/40">
                      <span>{t("subtotal")}</span>
                      <span className="line-through">{formatPrice(total)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white">
                    <span className="tracking-wider uppercase text-xs">{t("total")}</span>
                    <span className="text-lg">{formatPrice(discounted)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center bg-white text-black text-xs tracking-[0.2em] uppercase py-4 hover:bg-white/90 transition-colors"
                >
                  {t("checkout")}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
