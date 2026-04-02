"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const NAV_ITEMS = [
  { label: "Profile", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/account/wishlist" },
];

export default function AccountPage() {
  const [name, setName] = useState("Alex Ivanov");
  const [email, setEmail] = useState("alex@example.com");
  const [phone, setPhone] = useState("+7 999 123 45 67");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Profile update not yet implemented");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-10">
      <h1 className="text-3xl tracking-[0.2em] font-light mb-12">
        MY ACCOUNT
      </h1>

      <div className="flex flex-col md:flex-row gap-12 max-w-5xl">
        {/* Sidebar */}
        <nav className="flex md:flex-col gap-4 md:w-48 shrink-0">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-[0.15em] text-white/50 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Profile form */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-lg space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs tracking-[0.15em] text-white/40 mb-1 block">
                NAME
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider focus:border-white/30 focus:outline-none transition-colors"
              />
            </label>
            <label className="block">
              <span className="text-xs tracking-[0.15em] text-white/40 mb-1 block">
                EMAIL
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider focus:border-white/30 focus:outline-none transition-colors"
              />
            </label>
            <label className="block">
              <span className="text-xs tracking-[0.15em] text-white/40 mb-1 block">
                PHONE
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm tracking-wider focus:border-white/30 focus:outline-none transition-colors"
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-white text-black px-8 py-4 text-sm tracking-[0.2em] font-medium hover:bg-white/90 transition-colors"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>
    </div>
  );
}
