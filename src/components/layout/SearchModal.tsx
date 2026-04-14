"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/utils";
import { searchProducts } from "@/sanity/lib/queries";

interface SearchResult {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images?: { url?: string }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const t = useTranslations("search");
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setSearched(false);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Debounced search
  const search = useCallback(
    async (q: string) => {
      if (q.trim().length < 2) {
        setResults([]);
        setSearched(false);
        return;
      }
      setLoading(true);
      try {
        const data = await searchProducts(q.trim(), locale);
        setResults(data ?? []);
        setSearched(true);
      } catch {
        setResults([]);
        setSearched(true);
      } finally {
        setLoading(false);
      }
    },
    [locale]
  );

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/10">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 bg-transparent text-2xl md:text-4xl font-light text-white placeholder:text-white/20 outline-none tracking-tight"
            />
            <button
              onClick={onClose}
              className="ml-6 text-white/50 hover:text-white transition-colors"
              aria-label={t("close")}
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
            {loading && (
              <div className="flex justify-center py-16">
                <div className="w-5 h-5 border border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {!loading && searched && results.length === 0 && (
              <p className="text-sm tracking-widest uppercase text-white/30 text-center py-16">
                {t("noResults")}
              </p>
            )}

            {!loading && results.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {results.map((product) => {
                  const cover = product.images?.[0];
                  return (
                    <Link
                      key={product._id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 mb-3">
                        {cover?.url && (
                          <Image
                            src={cover.url}
                            alt={product.name || ""}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 20vw"
                          />
                        )}
                      </div>
                      <p className="text-xs tracking-wider uppercase text-white/70 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-white/40 mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
