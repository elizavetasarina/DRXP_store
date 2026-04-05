export interface SanityImageAsset {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SanityProductVariant {
  _key: string;
  size: string;
  color?: string;
  stock: number;
  sku?: string;
}

export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  comparePrice?: number;
  isFeatured: boolean;
  isPublished: boolean;
  categorySlug?: string;
  categoryName?: string;
  images?: SanityImageAsset[];
  variants?: SanityProductVariant[];
  tags?: string[];
}

export interface SanityLookbook {
  _id: string;
  title: string;
  slug: string;
  images?: SanityImageAsset[];
}

export interface SanityJournalPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImageAsset;
  body?: unknown[];
}
