import { orderRepository, CreateOrderInput } from '@/server/repositories/order.repository'
import { promoRepository } from '@/server/repositories/promo.repository'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export interface CreateOrderParams {
  userId: string
  items: { productId: string; variantId: string; quantity: number; price: number }[]
  shippingAddress: Record<string, string>
  promoCode?: string
  paymentMethod?: string
  shipping?: number
}

export const orderService = {
  async createOrder(params: CreateOrderParams) {
    const subtotal = params.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shipping = params.shipping ?? 0

    let discount = 0
    let promoCodeId: string | undefined

    if (params.promoCode) {
      const promo = await promoRepository.findByCode(params.promoCode)
      if (promo) {
        discount =
          promo.discountType === 'PERCENTAGE'
            ? Math.round((subtotal * promo.discountValue) / 100)
            : promo.discountValue
        promoCodeId = promo.id
        await promoRepository.incrementUsage(promo.id)
      }
    }

    // Verify all variants exist and have stock
    for (const item of params.items) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: item.variantId },
      })
      if (!variant) throw new Error(`Variant not found: ${item.variantId}`)
      if (variant.stock < item.quantity) {
        throw new Error(`Insufficient stock for variant: ${item.variantId}`)
      }
    }

    const input: CreateOrderInput = {
      userId: params.userId,
      items: params.items,
      subtotal,
      discount,
      shipping,
      total: subtotal - discount + shipping,
      promoCodeId,
      shippingAddress: params.shippingAddress as Prisma.InputJsonValue,
      paymentMethod: params.paymentMethod,
    }

    return orderRepository.create(input)
  },

  async getOrder(id: string) {
    const order = await orderRepository.findById(id)
    if (!order) throw new Error(`Order not found: ${id}`)
    return order
  },

  async getUserOrders(userId: string, page?: number, limit?: number) {
    return orderRepository.findByUserId(userId, page, limit)
  },
}
