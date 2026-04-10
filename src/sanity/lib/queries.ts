import { client } from "../client";

const fetchOptions = { next: { revalidate: 60 } } as const;

// helper for localized field projection
const i18n = (field: string) =>
  `coalesce(${field}[_key == $locale][0].value, ${field}[_key == "ru"][0].value)`;

// ─── Product queries ──────────────────────────────────────────────────────────

export async function getAllProducts(locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "product" && isPublished == true] | order(_createdAt desc) {
      _id,
      "name": ${i18n("name")},
      "slug": slug.current,
      "description": ${i18n("description")},
      price,
      comparePrice,
      isFeatured,
      isPublished,
      "categorySlug": category->slug.current,
      "categoryName": ${i18n("category->name")},
      images[]{
        "alt": ${i18n("alt")},
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
    { locale },
    fetchOptions
  );
}

export async function getProductBySlug(slug: string, locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      "name": ${i18n("name")},
      "slug": slug.current,
      "description": ${i18n("description")},
      price,
      comparePrice,
      isFeatured,
      isPublished,
      "categorySlug": category->slug.current,
      "categoryName": ${i18n("category->name")},
      images[]{
        "alt": ${i18n("alt")},
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
    { slug, locale },
    fetchOptions
  );
}

export async function getFeaturedProducts(locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "product" && isFeatured == true && isPublished == true] | order(_createdAt desc) [0...4] {
      _id,
      "name": ${i18n("name")},
      "slug": slug.current,
      price,
      comparePrice,
      images[0...1]{
        "alt": ${i18n("alt")},
        "url": asset.asset->url
      }
    }
  `,
    { locale },
    fetchOptions
  );
}

export async function getProductsByCategory(categorySlug: string, locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "product" && category->slug.current == $categorySlug && isPublished == true] | order(_createdAt desc) {
      _id,
      "name": ${i18n("name")},
      "slug": slug.current,
      price,
      comparePrice,
      images[0...1]{
        "alt": ${i18n("alt")},
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
    { categorySlug, locale },
    fetchOptions
  );
}

// ─── Lookbook queries ─────────────────────────────────────────────────────────

export async function getAllLookbooks(locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "lookbook"] | order(_createdAt desc) {
      _id,
      "title": ${i18n("title")},
      "slug": slug.current,
      images[]{
        "alt": ${i18n("alt")},
        "url": asset.asset->url
      }
    }
  `,
    { locale },
    fetchOptions
  );
}

export async function getLookbookBySlug(slug: string, locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "lookbook" && slug.current == $slug][0] {
      _id,
      "title": ${i18n("title")},
      "slug": slug.current,
      images[]{
        "alt": ${i18n("alt")},
        "url": asset.asset->url
      }
    }
  `,
    { slug, locale },
    fetchOptions
  );
}

// ─── Journal queries ──────────────────────────────────────────────────────────

export async function getAllJournalPosts(locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "journal"] | order(publishedAt desc) {
      _id,
      "title": ${i18n("title")},
      "slug": slug.current,
      "excerpt": ${i18n("excerpt")},
      publishedAt,
      coverImage{
        "alt": ${i18n("alt")},
        "url": asset.asset->url
      }
    }
  `,
    { locale },
    fetchOptions
  );
}

export async function getJournalPostBySlug(slug: string, locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "journal" && slug.current == $slug][0] {
      _id,
      "title": ${i18n("title")},
      "slug": slug.current,
      "excerpt": ${i18n("excerpt")},
      publishedAt,
      coverImage{
        "alt": ${i18n("alt")},
        "url": asset.asset->url
      },
      "body": coalesce(select($locale == "en" => bodyEn, bodyRu), body)
    }
  `,
    { slug, locale },
    fetchOptions
  );
}

// ─── Home page (singleton) ────────────────────────────────────────────────────

export async function getHomePage(locale: string = "ru") {
  return client.fetch(
    `
    *[_type == "homePage"][0]{
      hero{
        "image": image.asset->url,
        "tagline": ${i18n("tagline")},
        "ctaLabel": ${i18n("ctaLabel")}
      },
      editorial[]{
        "image": image.asset->url,
        "quote": ${i18n("quote")},
        "label": ${i18n("label")},
        "ctaLabel": ${i18n("ctaLabel")},
        ctaHref
      },
      "parallax": parallax[].asset->url,
      teaserCards[]{
        "title": ${i18n("title")},
        "subtitle": ${i18n("subtitle")},
        "image": image.asset->url,
        href
      }
    }
  `,
    { locale },
    fetchOptions
  );
}
