import { client } from "../client";

const fetchOptions = { next: { revalidate: 60 } } as const;

// ─── Product queries ──────────────────────────────────────────────────────────

export async function getAllProducts() {
  return client.fetch(
    `
    *[_type == "product" && isPublished == true] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      comparePrice,
      isFeatured,
      isPublished,
      "categorySlug": category->slug.current,
      "categoryName": category->name,
      images[]{
        alt,
        "url": asset.asset->url
      },
      variants[] {
        _key,
        size,
        color,
        stock,
        sku
      }
    }
  `,
    {},
    fetchOptions
  );
}

export async function getProductBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      comparePrice,
      isFeatured,
      isPublished,
      "categorySlug": category->slug.current,
      "categoryName": category->name,
      images[]{
        alt,
        "url": asset.asset->url
      },
      variants[] {
        _key,
        size,
        color,
        stock,
        sku
      },
      tags
    }
  `,
    { slug },
    fetchOptions
  );
}

export async function getFeaturedProducts() {
  return client.fetch(
    `
    *[_type == "product" && isFeatured == true && isPublished == true] | order(_createdAt desc) [0...4] {
      _id,
      name,
      "slug": slug.current,
      price,
      comparePrice,
      images[0...1]{
        alt,
        "url": asset.asset->url
      }
    }
  `,
    {},
    fetchOptions
  );
}

export async function getProductsByCategory(categorySlug: string) {
  return client.fetch(
    `
    *[_type == "product" && category->slug.current == $categorySlug && isPublished == true] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      price,
      comparePrice,
      images[0...1]{
        alt,
        "url": asset.asset->url
      },
      variants[] {
        _key,
        size,
        color,
        stock
      }
    }
  `,
    { categorySlug },
    fetchOptions
  );
}

// ─── Lookbook queries ─────────────────────────────────────────────────────────

export async function getAllLookbooks() {
  return client.fetch(
    `
    *[_type == "lookbook"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      images[]{
        alt,
        "url": asset.asset->url
      }
    }
  `,
    {},
    fetchOptions
  );
}

export async function getLookbookBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "lookbook" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      images[]{
        alt,
        "url": asset.asset->url
      }
    }
  `,
    { slug },
    fetchOptions
  );
}

// ─── Journal queries ──────────────────────────────────────────────────────────

export async function getAllJournalPosts() {
  return client.fetch(
    `
    *[_type == "journal"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      coverImage{
        alt,
        "url": asset.asset->url
      }
    }
  `,
    {},
    fetchOptions
  );
}

export async function getJournalPostBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "journal" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      coverImage{
        alt,
        "url": asset.asset->url
      },
      body
    }
  `,
    { slug },
    fetchOptions
  );
}
