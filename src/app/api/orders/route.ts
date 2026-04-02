import { NextRequest, NextResponse } from 'next/server'
import { promoService } from '@/server/services/promo.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, shippingAddress, promoCode, paymentMethod } = body as {
      items: { productId: string; variantId: string; quantity: number; price: number }[]
      shippingAddress: Record<string, string>
      promoCode?: string
      paymentMethod?: string
    }

    if (!items?.length || !shippingAddress) {
      return NextResponse.json(
        { error: 'items and shippingAddress are required' },
        { status: 400 },
      )
    }
    

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shipping = 0

    // Apply promo if provided
    let discount = 0
    let promoCodeId: string | undefined
    if (promoCode) {
      const promo = await promoService.validatePromo(promoCode, subtotal)
      if (promo.valid && promo.discountValue !== undefined) {
        discount =
          promo.discountType === 'PERCENTAGE'
            ? Math.round((subtotal * promo.discountValue) / 100)
            : promo.discountValue
        promoCodeId = promo.promoCodeId
      }
    }

    const total = subtotal - discount + shipping

    // TODO: persist to DB once auth is implemented (requires userId from session)
    // const order = await orderService.createOrder({ userId, items, shippingAddress, promoCode, paymentMethod, shipping })
    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

    return NextResponse.json({
      orderId,
      status: 'PENDING',
      subtotal,
      discount,
      shipping,
      total,
      ...(promoCodeId ? { promoCodeId } : {}),
      paymentMethod: paymentMethod ?? null,
    })
  } catch (error) {
    console.error('[POST /api/orders]', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
