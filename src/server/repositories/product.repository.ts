import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export interface FindAllParams {
  category?: string
  sort?: string
  search?: string
  page?: number
  limit?: number
}

export const productRepository = {
  async findAll({ category, sort, search, page = 1, limit = 12 }: FindAllParams) {
    const where: Prisma.ProductWhereInput = {
      isPublished: true,
      ...(category && { category: { slug: category } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      sort === 'price_asc'
        ? { price: 'asc' }
        : sort === 'price_desc'
        ? { price: 'desc' }
        : sort === 'name_asc'
        ? { name: 'asc' }
        : { createdAt: 'desc' }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: { images: { orderBy: { position: 'asc' } }, variants: true },
      }),
      prisma.product.count({ where }),
    ])

    return { products, total, page, totalPages: Math.ceil(total / limit) }
  },

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: true,
        category: true,
      },
    })
  },

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { position: 'asc' } }, variants: true },
    })
  },

  async findFeatured(limit = 6) {
    return prisma.product.findMany({
      where: { isFeatured: true, isPublished: true },
      take: limit,
      include: { images: { orderBy: { position: 'asc' } }, variants: true },
    })
  },

  async findByCategory(categoryId: string, excludeId?: string, limit = 4) {
    return prisma.product.findMany({
      where: {
        categoryId,
        isPublished: true,
        ...(excludeId && { id: { not: excludeId } }),
      },
      take: limit,
      include: { images: { orderBy: { position: 'asc' } }, variants: true },
    })
  },
}
