"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

export function Footer() {
  const [email, setEmail] = useState("");
  const t = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: string) => router.replace(pathname, { locale: next });

  const shopLinks = [
    { labelKey: "allProducts", href: "/shop" },
    { labelKey: "newArrivals", href: "/shop?sort=newest" },
    { labelKey: "tees", href: "/shop?category=tees" },
    { labelKey: "hoodies", href: "/shop?category=hoodies" },
    { labelKey: "pants", href: "/shop?category=pants" },
    { labelKey: "outerwear", href: "/shop?category=outerwear" },
    { labelKey: "accessories", href: "/shop?category=accessories" },
  ] as const;

  const infoLinks = [
    { labelKey: "lookbook", href: "/lookbook" },
    { labelKey: "journal", href: "/journal" },
  ] as const;

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Telegram", href: "https://t.me" },
    { label: "VK", href: "https://vk.com" },
  ];

  return (
    <footer className="bg-neutral-950 border-t border-white/5">
      <div className="px-6 md:px-10 py-12 md:py-20">
        <p className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-[0.2em] text-white/5 select-none mb-10 md:mb-16">
          DRXP
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5">{t("shopHeading")}</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5">{t("infoHeading")}</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5">{t("followHeading")}</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
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
            <h4 className="text-xs tracking-widest uppercase text-white/60 mb-5">{t("newsletterHeading")}</h4>
            <p className="text-xs text-white/30 mb-4 leading-relaxed">
              {t("newsletterCopy")}
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
              className="flex min-w-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="flex-1 min-w-0 bg-transparent border border-white/20 text-white text-xs tracking-wider px-3 py-2.5 placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="shrink-0 bg-white text-black text-xs tracking-widest uppercase px-3 md:px-4 py-2.5 hover:bg-white/90 transition-colors"
              >
                {t("newsletterSubmit")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-6 md:px-10 py-5 border-t border-white/5">
        <p className="text-[10px] tracking-widest uppercase text-white/30">
          {t("copyright")}
        </p>
        <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase">
          <button
            onClick={() => switchLocale("ru")}
            className={`transition-colors ${locale === "ru" ? "text-white" : "text-white/30 hover:text-white"}`}
          >
            {t("langRu")}
          </button>
          <span className="text-white/30">/</span>
          <button
            onClick={() => switchLocale("en")}
            className={`transition-colors ${locale === "en" ? "text-white" : "text-white/30 hover:text-white"}`}
          >
            {t("langEn")}
          </button>
        </div>
      </div>
    </footer>
  );
}
