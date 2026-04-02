import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { items, shippingAddress, promoCode } = body as {
    items: { productId: string; variantId: string; quantity: number; price: number }[]
    shippingAddress: Record<string, string>
    promoCode?: string
  }

  if (!items?.length || !shippingAddress) {
    return NextResponse.json(
      { error: 'items and shippingAddress are required' },
      { status: 400 },
    )
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

  return NextResponse.json({
    orderId,
    status: 'PENDING',
    total,
    ...(promoCode ? { promoCode } : {}),
  })
}
