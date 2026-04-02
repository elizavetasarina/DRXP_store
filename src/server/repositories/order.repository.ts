import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export interface CreateOrderInput {
  userId: string
  items: { productId: string; variantId: string; quantity: number; price: number }[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  promoCodeId?: string
  shippingAddress: Prisma.InputJsonValue
  paymentMethod?: string
}

export const orderRepository = {
  async create(data: CreateOrderInput) {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: data.userId,
          subtotal: data.subtotal,
          discount: data.discount,
          shipping: data.shipping,
          total: data.total,
          promoCodeId: data.promoCodeId ?? null,
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod ?? null,
        },
      })

      await tx.orderItem.createMany({
        data: data.items.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      })

      return order
    })
  },

  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: { include: { images: { orderBy: { position: 'asc' }, take: 1 } } },
            variant: true,
          },
        },
      },
    })
  },

  async findByUserId(userId: string, page = 1, limit = 10) {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { items: true },
      }),
      prisma.order.count({ where: { userId } }),
    ])
    return { orders, total, page, totalPages: Math.ceil(total / limit) }
  },

  async updateStatus(id: string, status: string) {
    return prisma.order.update({
      where: { id },
      data: { status: status as never },
    })
  },
}
