"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: Date;
  items: OrderItem[];
}

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: "bg-green-500/10 text-green-400 border-green-500/20",
  SHIPPED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PROCESSING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  PAID: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  PENDING: "bg-white/5 text-white/40 border-white/10",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export function OrderList({ orders }: { orders: Order[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <>
        <p className="text-white/40 text-sm tracking-wider mb-6">No orders yet</p>
        <Link
          href="/shop"
          className="text-sm tracking-[0.15em] underline underline-offset-4 text-white/60 hover:text-white transition-colors"
        >
          BROWSE SHOP
        </Link>
      </>
    );
  }

  return (
    <div className="max-w-3xl space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border border-white/10">
          <button
            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            className="w-full flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-6">
              <span className="text-sm tracking-[0.1em] font-medium">
                {order.id.slice(0, 8).toUpperCase()}
              </span>
              <span className="text-xs text-white/30">
                {new Date(order.createdAt).toLocaleDateString("ru-RU")}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className={`text-[10px] tracking-[0.15em] px-3 py-1 border ${STATUS_STYLES[order.status] ?? STATUS_STYLES.PENDING}`}>
                {order.status}
              </span>
              <span className="text-sm text-white/60">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </span>
              <span className="text-sm tracking-wider">
                {formatPrice(order.total)}
              </span>
            </div>
          </button>

          {expanded === order.id && (
            <div className="border-t border-white/5 px-6 py-4 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/60 font-mono text-xs">{item.variantId.slice(0, 12)}</span>
                  <span className="text-white/40">
                    {item.quantity} × {formatPrice(item.price)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/5 flex justify-between text-sm">
                <span className="text-white/40 tracking-wider">TOTAL</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
