import { client } from "../client";

// ─── Product queries ──────────────────────────────────────────────────────────

export async function getAllProducts() {
  return client.fetch(`
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
      images[] {
        asset,
        alt
      },
      variants[] {
        _key,
        size,
        color,
        stock,
        sku
      }
    }
  `);
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
      images[] {
        asset,
        alt
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
    { slug }
  );
}

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && isFeatured == true && isPublished == true] | order(_createdAt desc) [0...4] {
      _id,
      name,
      "slug": slug.current,
      price,
      comparePrice,
      images[0] {
        asset,
        alt
      }
    }
  `);
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
      images[0] {
        asset,
        alt
      },
      variants[] {
        _key,
        size,
        color,
        stock
      }
    }
  `,
    { categorySlug }
  );
}

// ─── Lookbook queries ─────────────────────────────────────────────────────────

export async function getAllLookbooks() {
  return client.fetch(`
    *[_type == "lookbook"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      images[] {
        asset,
        alt
      }
    }
  `);
}

export async function getLookbookBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "lookbook" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      images[] {
        asset,
        alt
      }
    }
  `,
    { slug }
  );
}

// ─── Journal queries ──────────────────────────────────────────────────────────

export async function getAllJournalPosts() {
  return client.fetch(`
    *[_type == "journal"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      coverImage {
        asset,
        alt
      }
    }
  `);
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
      coverImage {
        asset,
        alt
      },
      body
    }
  `,
    { slug }
  );
}
