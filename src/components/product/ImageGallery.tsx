"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";

interface Props {
  images: ProductImage[];
}

export function ImageGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 group cursor-crosshair relative">
        {current?.url ? (
          <Image
            src={current.url}
            alt={current.alt ?? "Product image"}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 55vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-20 overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 border transition-colors ${
                selected === i ? "border-white" : "border-transparent hover:border-white/30"
              }`}
            >
              {img.url && (
                <Image
                  src={img.url}
                  alt={img.alt ?? `View ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
