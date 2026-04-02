"use client";

import { useState } from "react";
import type { ProductImage } from "@/types/product";

interface Props {
  images: ProductImage[];
}

export function ImageGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 group cursor-crosshair">
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800 transition-transform duration-500 ease-out group-hover:scale-105" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`w-16 h-20 bg-gradient-to-br from-neutral-900 to-neutral-800 border transition-colors ${
                selected === i ? "border-white" : "border-transparent hover:border-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
