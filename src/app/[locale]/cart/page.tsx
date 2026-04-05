"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export default function CartPage() {
  const t = useTranslations("cart");
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getDiscountedTotal = useCartStore((s) => s.getDiscountedTotal);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const removePromo = useCartStore((s) => s.removePromo);
  const promoCode = useCartStore((s) => s.promoCode);

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const subtotal = getTotalPrice();
  const total = getDiscountedTotal();
  const discount = subtotal - total;

  const handleApplyPromo = async () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    setPromoLoading(true);
    setPromoError("");

    const res = await fetch("/api/promo/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, subtotal }),
    });

    const data = await res.json();
    setPromoLoading(false);

    if (!data.valid) {
      setPromoError(data.error ?? "Недействительный промокод");
      return;
    }

    applyPromo({
      code,
      discountType: data.discountType === "PERCENTAGE" ? "percentage" : "fixed",
      discountValue: data.discountValue,
    });
    setPromoInput("");
  };

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <AnimatedSection>
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-6xl font-bold tracking-tight">{t("title")}</h1>
          <Link
            href="/shop"
            className="text-sm text-white/50 hover:text-white transition-colors tracking-[0.15em] uppercase"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </AnimatedSection>

      {items.length === 0 ? (
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <p className="text-white/50 text-lg">{t("empty")}</p>
            <Link
              href="/shop"
              className="bg-white text-black px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
            >
              {t("shopNow")}
            </Link>
          </div>
        </AnimatedSection>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Items List */}
          <div className="flex-1 lg:w-[65%]">
            <div className="border-t border-white/10">
              {items.map((item) => (
                <AnimatedSection key={`${item.productId}-${item.variantId}`}>
                  <div className="flex gap-6 py-6 border-b border-white/10">
                    {/* Image placeholder */}
                    <div className="w-24 h-32 bg-gradient-to-br from-neutral-800 to-neutral-900 flex-shrink-0" />

                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-medium tracking-wide uppercase">
                            {item.name}
                          </h3>
                          <p className="text-xs text-white/40 mt-1">
                            {item.size} / {item.color}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-white/30 hover:text-white transition-colors text-lg leading-none"
                          aria-label={t("continueShopping")}
                        >
                          &times;
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-white/10">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors text-sm"
                          >
                            &minus;
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm border-x border-white/10">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[35%]">
            <AnimatedSection>
              <div className="bg-neutral-950 border border-white/5 p-6">
                <h2 className="text-sm font-medium tracking-[0.15em] uppercase mb-6">
                  {t("orderSummary")}
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">{t("subtotal")}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {/* Promo code */}
                  {promoCode ? (
                    <div className="flex justify-between items-center">
                      <span className="text-white/50">
                        {t("promoApplied", { code: promoCode.code })}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">
                          &minus;{formatPrice(discount)}
                        </span>
                        <button
                          onClick={removePromo}
                          className="text-white/30 hover:text-white text-xs"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder={t("promoCode")}
                          className="flex-1 bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30"
                        />
                        <button
                          onClick={handleApplyPromo}
                          disabled={promoLoading}
                          className="border border-white/10 px-4 py-3 text-sm text-white/70 hover:text-white hover:border-white/30 transition-colors tracking-[0.1em] uppercase disabled:opacity-50"
                        >
                          {promoLoading ? "..." : t("apply")}
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-red-400 text-xs mt-2">{promoError}</p>
                      )}
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-3 mt-3 flex justify-between font-medium">
                    <span>{t("total")}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-white text-black text-center py-4 mt-6 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
                >
                  {t("proceedToCheckout")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      )}
    </main>
  );
}
