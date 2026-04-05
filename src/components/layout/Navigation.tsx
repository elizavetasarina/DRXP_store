"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useUIStore } from "@/store/uiStore";

const NAV_KEYS = [
  { key: "home", href: "/" },
  { key: "shop", href: "/shop" },
  { key: "lookbook", href: "/lookbook" },
  { key: "about", href: "/about" },
  { key: "journal", href: "/journal" },
  { key: "contact", href: "/contact" },
] as const;

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Telegram", href: "https://t.me" },
  { label: "VK", href: "https://vk.com" },
];

export default function Navigation() {
  const { isMenuOpen, toggleMenu } = useUIStore();
  const t = useTranslations("nav");

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-40 bg-black flex flex-col justify-between px-8 md:px-16 py-24"
        >
          {/* Close */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 md:top-8 md:right-10 text-white hover:opacity-60 transition-opacity"
            aria-label={t("closeMenu")}
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>

          {/* Links */}
          <div className="flex flex-col gap-2 md:gap-4 mt-8">
            {NAV_KEYS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={toggleMenu}
                  className="group flex items-center text-5xl md:text-7xl font-light text-white/90 hover:text-white transition-all duration-300"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-4">
                    {t(item.key)}
                  </span>
                  <span className="ml-4 h-px w-0 bg-white group-hover:w-16 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex gap-8 text-sm tracking-widest text-white/50"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300 uppercase"
              >
                {s.label}
              </a>
            ))}
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
