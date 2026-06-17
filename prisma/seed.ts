import { PrismaClient, DiscountType } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Categories ───────────────────────────────────────────────────────────

  const categoryData = [
    { name: 'Hoodies & Sweatshirts', slug: 'hoodies' },
    { name: 'Tees', slug: 'tees' },
    { name: 'Pants', slug: 'pants' },
    { name: 'Outerwear', slug: 'outerwear' },
    { name: 'Accessories', slug: 'accessories' },
  ]

  for (const cat of categoryData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  console.log('✓ Categories created')

  const categories = await prisma.category.findMany()
  const bySlug = Object.fromEntries(categories.map(c => [c.slug, c]))

  // ─── Products ─────────────────────────────────────────────────────────────

  const productData = [
    {
      name: 'HOODIE — ECLIPSE',
      slug: 'hoodie-eclipse',
      description: '400 GSM French terry hoodie with kangaroo pocket and embossed DRXP logo on chest. Double-layered hood.',
      price: 750000,
      comparePrice: 850000,
      categorySlug: 'hoodies',
      tags: ['hoodie', 'french terry', 'oversized', 'logo'],
      isPublished: true,
      isFeatured: true,
      images: [{ url: '/images/products/hoodie-01.jpg', alt: 'Hoodie Eclipse front', position: 0 }],
      variants: [
        { size: 'M', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'hoodie-eclipse-M-SB', stock: 20 },
        { size: 'L', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'hoodie-eclipse-L-SB', stock: 16 },
        { size: 'XL', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'hoodie-eclipse-XL-SB', stock: 9 },
      ],
    },
    {
      name: 'OVERSIZED TEE — SHADOW',
      slug: 'oversized-tee-shadow',
      description: 'Premium heavyweight cotton oversized tee in our signature Shadow Black. Drop-shoulder silhouette with raw-edge hem detail.',
      price: 550000,
      comparePrice: null,
      categorySlug: 'tees',
      tags: ['tee', 'oversized', 'cotton', 'streetwear'],
      isPublished: true,
      isFeatured: true,
      images: [{ url: '/images/products/tee-01.jpg', alt: 'Oversized Tee Shadow front', position: 0 }],
      variants: [
        { size: 'S', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'oversized-tee-shadow-S-SB', stock: 12 },
        { size: 'M', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'oversized-tee-shadow-M-SB', stock: 18 },
        { size: 'L', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'oversized-tee-shadow-L-SB', stock: 15 },
        { size: 'XL', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'oversized-tee-shadow-XL-SB', stock: 8 },
      ],
    },
    {
      name: 'CARGO PANTS — VOID',
      slug: 'cargo-pants-void',
      description: 'Technical cargo pants with 3D pockets and adjustable ankle cuffs. Water-resistant ripstop fabric in Void Gray.',
      price: 890000,
      comparePrice: null,
      categorySlug: 'pants',
      tags: ['cargo', 'pants', 'technical', 'ripstop'],
      isPublished: true,
      isFeatured: true,
      images: [{ url: '/images/products/cargo-01.jpg', alt: 'Cargo Pants Void front', position: 0 }],
      variants: [
        { size: 'S', color: 'Void Gray', colorHex: '#333333', sku: 'cargo-pants-void-S-VG', stock: 6 },
        { size: 'M', color: 'Void Gray', colorHex: '#333333', sku: 'cargo-pants-void-M-VG', stock: 14 },
        { size: 'L', color: 'Void Gray', colorHex: '#333333', sku: 'cargo-pants-void-L-VG', stock: 10 },
        { size: 'XL', color: 'Void Gray', colorHex: '#333333', sku: 'cargo-pants-void-XL-VG', stock: 5 },
      ],
    },
    {
      name: 'TACTICAL JACKET — PHANTOM',
      slug: 'tactical-jacket-phantom',
      description: 'Nylon tactical jacket with matte finish, ribbed cuffs, and tonal DRXP embroidery on back. YKK zippers throughout.',
      price: 1290000,
      comparePrice: null,
      categorySlug: 'outerwear',
      tags: ['jacket', 'tactical', 'nylon', 'outerwear'],
      isPublished: true,
      isFeatured: true,
      images: [{ url: '/images/products/jacket-01.jpg', alt: 'Tactical Jacket Phantom front', position: 0 }],
      variants: [
        { size: 'M', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'tactical-jacket-phantom-M-SB', stock: 7 },
        { size: 'L', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'tactical-jacket-phantom-L-SB', stock: 5 },
        { size: 'XL', color: 'Shadow Black', colorHex: '#0A0A0A', sku: 'tactical-jacket-phantom-XL-SB', stock: 3 },
      ],
    },
  ]

  for (const product of productData) {
    const { images, variants, categorySlug, ...fields } = product

    const existing = await prisma.product.findUnique({ where: { slug: product.slug } })
    if (existing) {
      console.log(`- Skipped (exists): ${product.name}`)
      continue
    }

    const created = await prisma.product.create({
      data: { ...fields, categoryId: bySlug[categorySlug].id },
    })

    await prisma.productImage.createMany({
      data: images.map(img => ({ ...img, productId: created.id })),
      skipDuplicates: true,
    })

    await prisma.productVariant.createMany({
      data: variants.map(v => ({ ...v, productId: created.id })),
      skipDuplicates: true,
    })

    console.log(`✓ Product: ${created.name}`)
  }

  // ─── Promo Codes ──────────────────────────────────────────────────────────

  await prisma.promoCode.upsert({
    where: { code: 'DRXP10' },
    update: {},
    create: { code: 'DRXP10', discountType: DiscountType.PERCENTAGE, discountValue: 10, minOrderTotal: 50000, isActive: true },
  })

  await prisma.promoCode.upsert({
    where: { code: 'DRXP20' },
    update: {},
    create: { code: 'DRXP20', discountType: DiscountType.PERCENTAGE, discountValue: 20, minOrderTotal: 100000, maxUses: 100, isActive: true },
  })

  console.log('✓ Promo codes created: DRXP10, DRXP20')
  console.log('✅ Seed complete')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
