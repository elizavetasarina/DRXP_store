import { promoRepository } from '@/server/repositories/promo.repository'

export interface ValidatePromoResult {
  valid: boolean
  discountType?: 'PERCENTAGE' | 'FIXED'
  discountValue?: number
  promoCodeId?: string
  message: string
}

export const promoService = {
  async validatePromo(code: string, orderTotal: number): Promise<ValidatePromoResult> {
    const promo = await promoRepository.findByCode(code)

    if (!promo) {
      return { valid: false, message: 'Промокод не найден или недействителен' }
    }

    if (promo.minOrderTotal !== null && orderTotal < promo.minOrderTotal) {
      return {
        valid: false,
        message: `Минимальная сумма заказа для этого промокода: ${promo.minOrderTotal / 100} ₽`,
      }
    }

    return {
      valid: true,
      discountType: promo.discountType as 'PERCENTAGE' | 'FIXED',
      discountValue: promo.discountValue,
      promoCodeId: promo.id,
      message: 'Промокод применён',
    }
  },
}
