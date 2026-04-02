"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, X } from "lucide-react";
import { CATEGORIES, SIZES } from "@/lib/constants";

interface Props {
  selectedCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  selectedSizes: string[];
  onSizeToggle: (size: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClose?: () => void;
  mobile?: boolean;
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedSizes,
  onSizeToggle,
  priceRange,
  onClose,
  mobile,
}: Props) {
  return (
    <div className={mobile ? "p-6" : ""}>
      {mobile && (
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs tracking-[0.2em] uppercase">Filters</span>
          <button onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Accordion.Root type="multiple" defaultValue={["categories", "size", "price"]}>
        {/* Categories */}
        <Accordion.Item value="categories" className="border-b border-white/10">
          <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors group">
            Categories
            <ChevronDown className="w-3 h-3 transition-transform group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content className="pb-4 space-y-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`block text-xs tracking-wider transition-colors ${
                !selectedCategory ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`block text-xs tracking-wider transition-colors ${
                  selectedCategory === cat.id ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </Accordion.Content>
        </Accordion.Item>

        {/* Size */}
        <Accordion.Item value="size" className="border-b border-white/10">
          <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors group">
            Size
            <ChevronDown className="w-3 h-3 transition-transform group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content className="pb-4">
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => onSizeToggle(size)}
                  className={`py-1.5 text-[10px] tracking-widest uppercase border transition-colors ${
                    selectedSizes.includes(size)
                      ? "border-white bg-white text-black"
                      : "border-white/10 text-white/50 hover:border-white/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Item>

        {/* Price */}
        <Accordion.Item value="price" className="border-b border-white/10">
          <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors group">
            Price
            <ChevronDown className="w-3 h-3 transition-transform group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content className="pb-4">
            <p className="text-xs text-white/40">
              {(priceRange[0] / 100).toLocaleString("ru-RU")} &#8381; &mdash;{" "}
              {(priceRange[1] / 100).toLocaleString("ru-RU")} &#8381;
            </p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
