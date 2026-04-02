import { NextRequest, NextResponse } from 'next/server'

const PROMOS: Record<string, { discountType: 'percent' | 'fixed'; discountValue: number }> = {
  DRXP10: { discountType: 'percent', discountValue: 10 },
  DRXP20: { discountType: 'percent', discountValue: 20 },
  SAVE500: { discountType: 'fixed', discountValue: 500 },
}

export async function POST(request: NextRequest) {
  const { code } = (await request.json()) as { code?: string }

  if (!code) {
    return NextResponse.json({ valid: false, message: 'Code is required' }, { status: 400 })
  }

  const promo = PROMOS[code.toUpperCase()]

  if (!promo) {
    return NextResponse.json({ valid: false, message: 'Invalid code' })
  }

  return NextResponse.json({
    valid: true,
    code: code.toUpperCase(),
    discountType: promo.discountType,
    discountValue: promo.discountValue,
  })
}
