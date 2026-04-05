"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function OrderConfirmationContent() {
  const orderId = useSearchParams().get("orderId");

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="text-3xl tracking-[0.2em] font-light mb-4">
        ORDER PLACED
      </h1>

      <p className="text-white/40 text-sm tracking-wider mb-2">
        Thank you for your purchase
      </p>

      {orderId && (
        <p className="text-white/30 text-xs tracking-[0.15em] font-mono mb-10">
          {orderId}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/account/orders"
          className="bg-white text-black px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
        >
          VIEW ORDERS
        </Link>
        <Link
          href="/shop"
          className="border border-white/20 px-8 py-4 text-sm tracking-[0.2em] uppercase hover:border-white/40 transition-colors"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <OrderConfirmationContent />
    </Suspense>
  );
}
