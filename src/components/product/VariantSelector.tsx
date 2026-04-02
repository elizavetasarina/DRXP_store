"use client";

import type { ProductVariant } from "@/types/product";
import { COLORS } from "@/lib/constants";

interface Props {
  variants: ProductVariant[];
  selectedSize: string | null;
  onSizeChange: (size: string) => void;
  selectedColor: string | null;
  onColorChange: (color: string) => void;
}

export function VariantSelector({
  variants,
  selectedSize,
  onSizeChange,
  selectedColor,
  onColorChange,
}: Props) {
  const availableSizes = [...new Set(variants.map((v) => v.size))];
  const availableColors = [...new Set(variants.map((v) => v.color).filter((c): c is string => !!c))];

  const getStockForSize = (size: string) =>
    variants.filter((v) => v.size === size && (!selectedColor || v.color === selectedColor))
      .reduce((sum, v) => sum + v.stock, 0);

  const getColorHex = (name: string) =>
    COLORS.find((c) => c.name === name)?.value ?? "#888";

  return (
    <div className="space-y-6">
      {/* Size */}
      <div>
        <span className="text-xs tracking-[0.2em] uppercase text-white/50 block mb-3">
          Size
        </span>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const stock = getStockForSize(size);
            const oos = stock === 0;
            return (
              <button
                key={size}
                onClick={() => !oos && onSizeChange(size)}
                disabled={oos}
                className={`px-4 py-2 text-xs tracking-wider uppercase border transition-colors ${
                  selectedSize === size
                    ? "bg-white text-black border-white"
                    : oos
                    ? "border-white/5 text-white/20 cursor-not-allowed"
                    : "border-white/20 text-white/70 hover:border-white/50"
                }`}
              >
                {size}
                {oos && <span className="sr-only"> (Out of stock)</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color */}
      {availableColors.length > 1 && (
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-white/50 block mb-3">
            Color{selectedColor ? ` — ${selectedColor}` : ""}
          </span>
          <div className="flex gap-3">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={`w-6 h-6 rounded-full transition-all ${
                  selectedColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""
                }`}
                style={{ backgroundColor: getColorHex(color) }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
