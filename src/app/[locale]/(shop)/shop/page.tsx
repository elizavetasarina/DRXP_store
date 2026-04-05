"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import type { Product } from "@/types/product";

export default function ShopPage() {
  const t = useTranslations("shop");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [priceRange] = useState<[number, number]>([0, 2000000]);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const filtered = useMemo(() => {
    let result: Product[] = [...PRODUCTS];

    if (selectedCategory) {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => selectedSizes.includes(v.size) && v.stock > 0)
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [selectedCategory, selectedSizes, sort, priceRange]);

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title */}
        <AnimatedSection>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-12">
            {t("title")}
          </h1>
        </AnimatedSection>

        <div className="flex gap-12">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-64 shrink-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSizes={selectedSizes}
              onSizeToggle={handleSizeToggle}
              priceRange={priceRange}
              onPriceChange={() => {}}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFilters(true)}
                  className="md:hidden flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {t("filters")}
                </button>
                <span className="text-xs tracking-wider text-white/40 uppercase">
                  {t("productCount", { count: filtered.length })}
                </span>
              </div>
              <SortDropdown value={sort} onChange={setSort} />
            </div>

            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>

      {/* Mobile filter panel */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-80 bg-black border-r border-white/10 overflow-y-auto">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => {
                setSelectedCategory(cat);
              }}
              selectedSizes={selectedSizes}
              onSizeToggle={handleSizeToggle}
              priceRange={priceRange}
              onPriceChange={() => {}}
              onClose={() => setMobileFilters(false)}
              mobile
            />
          </div>
        </div>
      )}
    </main>
  );
}
