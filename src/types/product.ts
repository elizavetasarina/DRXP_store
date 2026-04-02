export interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  position: number;
}

export interface ProductVariant {
  id: string;
  size: string;
  color?: string | null;
  colorHex?: string | null;
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  categoryId: string;
  category?: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  parentId?: string | null;
}
