import { prisma } from '@/lib/prisma'

export const promoRepository = {
  async findByCode(code: string) {
    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!promo) return null
    if (!promo.isActive) return null
    if (promo.expiresAt && promo.expiresAt < new Date()) return null
    if (promo.maxUses !== null && promo.usedCount >= promo.maxUses) return null

    return promo
  },

  async incrementUsage(id: string) {
    return prisma.promoCode.update({
      where: { id },
      data: { usedCount: { increment: 1 } },
    })
  },
}
