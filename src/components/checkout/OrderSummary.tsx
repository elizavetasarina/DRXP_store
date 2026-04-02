"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getDiscountedTotal = useCartStore((s) => s.getDiscountedTotal);
  const promoCode = useCartStore((s) => s.promoCode);

  const subtotal = getTotalPrice();
  const discountedTotal = getDiscountedTotal();
  const discount = subtotal - discountedTotal;
  const shippingCost = subtotal > 1000000 ? 0 : 50000; // free above 10 000 ₽, else 500 ₽
  const total = discountedTotal + shippingCost;

  return (
    <div className="sticky top-32 bg-neutral-950 p-6 border border-white/5">
      <h2 className="text-sm font-medium tracking-[0.15em] uppercase mb-6">
        Order Summary
      </h2>

      {/* Item list */}
      <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variantId}`}
            className="flex justify-between gap-4 text-sm"
          >
            <div className="min-w-0">
              <p className="truncate">{item.name}</p>
              <p className="text-white/40 text-xs mt-0.5">
                {item.size} &middot; Qty {item.quantity}
              </p>
            </div>
            <span className="flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-white/50">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-white/50">Shipping</span>
          <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-white/50">Discount ({promoCode?.code})</span>
            <span className="text-green-400">&minus;{formatPrice(discount)}</span>
          </div>
        )}

        <div className="border-t border-white/10 pt-3 flex justify-between font-medium">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
