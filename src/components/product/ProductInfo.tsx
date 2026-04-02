import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface Props {
  product: Product;
}

export function ProductInfo({ product }: Props) {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-light tracking-wider uppercase">
        {product.name}
      </h1>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-xl text-white">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-sm text-white/30 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      <p className="text-sm text-white/60 leading-relaxed mt-6">
        {product.description}
      </p>
    </div>
  );
}
