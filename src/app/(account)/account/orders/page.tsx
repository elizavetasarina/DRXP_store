"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  date: string;
  status: "DELIVERED" | "SHIPPED" | "PROCESSING";
  total: number;
  itemsCount: number;
  items: { name: string; size: string; price: number }[];
}

const MOCK_ORDERS: Order[] = [
  {
    id: "DRX-10042",
    date: "2026-03-15",
    status: "DELIVERED",
    total: 1890000,
    itemsCount: 2,
    items: [
      { name: "Void Oversized Tee", size: "L", price: 690000 },
      { name: "Shadow Cargo Pants", size: "M", price: 1200000 },
    ],
  },
  {
    id: "DRX-10038",
    date: "2026-03-28",
    status: "SHIPPED",
    total: 2450000,
    itemsCount: 3,
    items: [
      { name: "Obsidian Hoodie", size: "XL", price: 1150000 },
      { name: "Ash Layer Jacket", size: "L", price: 950000 },
      { name: "Bone Cap", size: "OS", price: 350000 },
    ],
  },
  {
    id: "DRX-10051",
    date: "2026-04-01",
    status: "PROCESSING",
    total: 750000,
    itemsCount: 1,
    items: [{ name: "Rust Graphic Tee", size: "M", price: 750000 }],
  },
];

const STATUS_STYLES: Record<Order["status"], string> = {
  DELIVERED: "bg-green-500/10 text-green-400 border-green-500/20",
  SHIPPED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PROCESSING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function OrdersPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (MOCK_ORDERS.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-10">
        <h1 className="text-3xl tracking-[0.2em] font-light mb-12">
          ORDER HISTORY
        </h1>
        <p className="text-white/40 text-sm tracking-wider mb-6">
          No orders yet
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
      <h1 className="text-3xl tracking-[0.2em] font-light mb-12">
        ORDER HISTORY
      </h1>

      <div className="max-w-3xl space-y-4">
        {MOCK_ORDERS.map((order) => (
          <div
            key={order.id}
            className="border border-white/10 transition-colors"
          >
            <button
              onClick={() =>
                setExpanded(expanded === order.id ? null : order.id)
              }
              className="w-full flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-sm tracking-[0.1em] font-medium">
                  {order.id}
                </span>
                <span className="text-xs text-white/30">{order.date}</span>
              </div>
              <div className="flex items-center gap-6">
                <span
                  className={`text-[10px] tracking-[0.15em] px-3 py-1 border ${STATUS_STYLES[order.status]}`}
                >
                  {order.status}
                </span>
                <span className="text-sm text-white/60">
                  {order.itemsCount} item{order.itemsCount > 1 ? "s" : ""}
                </span>
                <span className="text-sm tracking-wider">
                  {formatPrice(order.total)}
                </span>
              </div>
            </button>

            {expanded === order.id && (
              <div className="border-t border-white/5 px-6 py-4 space-y-3">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white/60">
                      {item.name}{" "}
                      <span className="text-white/30">/ {item.size}</span>
                    </span>
                    <span className="text-white/40">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
