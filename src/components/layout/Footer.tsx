"use client";

import { useState } from "react";
import Link from "next/link";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Tees", href: "/shop/tees" },
  { label: "Hoodies", href: "/shop/hoodies" },
  { label: "Pants", href: "/shop/pants" },
  { label: "Outerwear", href: "/shop/outerwear" },
  { label: "Accessories", href: "/shop/accessories" },
];

const infoLinks = [
  { label: "About", href: "/about" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Telegram", href: "https://t.me" },
  { label: "VK", href: "https://vk.com" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-neutral-950 border-t border-white/5">
      <div className="px-6 md:px-10 py-20">
        {/* Large brand text */}
        <p className="text-6xl md:text-8xl font-bold tracking-[0.2em] text-white/5 select-none mb-16">
          DRXP
        </p>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5">Info</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5">Follow</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5">Newsletter</h4>
            <p className="text-xs text-white/30 mb-4 leading-relaxed">
              Early access to drops, lookbooks, and exclusive offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 bg-transparent border border-white/20 text-white text-xs tracking-wider px-3 py-2.5 placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-white/90 transition-colors"
              >
                OK
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-t border-white/5">
        <p className="text-[10px] tracking-widest uppercase text-white/30">
          &copy; 2024 DRXP. All rights reserved.
        </p>
        <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-white/30">
          <button className="hover:text-white transition-colors">RU</button>
          <span>/</span>
          <button className="hover:text-white transition-colors">EN</button>
        </div>
      </div>
    </footer>
  );
}
