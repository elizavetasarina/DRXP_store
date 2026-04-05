"use client";

import { FormEvent, useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AccountPage() {
  const { data: session } = useSession();
  const t = useTranslations("account");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navItems = [
    { labelKey: "profile" as const, href: "/account" },
    { labelKey: "orders" as const, href: "/account/orders" },
    { labelKey: "wishlist" as const, href: "/account/wishlist" },
  ];

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Profile update not yet implemented");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-10">
      <h1 className="text-3xl tracking-[0.2em] font-light mb-12">
        {t("title")}
      </h1>

      <div className="flex flex-col md:flex-row gap-12 max-w-5xl">
        {/* Sidebar */}
        <nav className="flex md:flex-col gap-4 md:w-48 shrink-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-[0.15em] text-white/50 hover:text-white transition-colors"
            >
              {t(item.labelKey)}
            </Link>
          ))}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm tracking-[0.15em] text-white/50 hover:text-white transition-colors text-left"
          >
            {t("signOut")}
          </button>
        </nav>

        {/* Profile form */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-lg space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs tracking-[0.15em] text-white/40 mb-1 block">
                {t("name")}
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
                {t("email")}
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
                {t("phone")}
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
            {t("saveChanges")}
          </button>
        </form>
      </div>
    </div>
  );
}
