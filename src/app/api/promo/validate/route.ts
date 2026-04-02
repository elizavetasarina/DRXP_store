import { NextRequest, NextResponse } from 'next/server'
import { promoService } from '@/server/services/promo.service'

export async function POST(request: NextRequest) {
  try {
    const { code, orderTotal } = (await request.json()) as {
      code?: string
      orderTotal?: number
    }

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Code is required' }, { status: 400 })
    }

    const result = await promoService.validatePromo(code, orderTotal ?? 0)

    if (!result.valid) {
      return NextResponse.json({ valid: false, message: result.message })
    }

    // Normalize discountType for frontend (PERCENTAGE → percent, FIXED → fixed)
    const discountType = result.discountType === 'PERCENTAGE' ? 'percent' : 'fixed'

    return NextResponse.json({
      valid: true,
      code: code.toUpperCase(),
      discountType,
      discountValue: result.discountValue,
      promoCodeId: result.promoCodeId,
    })
  } catch (error) {
    console.error('[POST /api/promo/validate]', error)
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 })
  }
}
