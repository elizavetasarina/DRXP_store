import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { promoService } from '@/server/services/promo.service'
import { orderService } from '@/server/services/order.service'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()
    const { items, shippingAddress, promoCode, paymentMethod } = body as {
      items: { productId: string; variantId: string; quantity: number; price: number }[]
      shippingAddress: Record<string, string>
      promoCode?: string
      paymentMethod?: string
    }

    if (!items?.length || !shippingAddress) {
      return NextResponse.json({ error: 'items and shippingAddress are required' }, { status: 400 })
    }

    // If authenticated — persist to DB
    if (session?.user?.id) {
      const order = await orderService.createOrder({
        userId: session.user.id,
        items,
        shippingAddress,
        promoCode,
        paymentMethod,
      })
      return NextResponse.json({ orderId: order.id, status: order.status, total: order.total })
    }

    // Guest checkout — calculate totals without persisting
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
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
    const total = subtotal - discount
    const orderId = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

    return NextResponse.json({
      orderId,
      status: 'PENDING',
      subtotal,
      discount,
      total,
      ...(promoCodeId ? { promoCodeId } : {}),
      paymentMethod: paymentMethod ?? null,
    })
  } catch (error) {
    console.error('[POST /api/orders]', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
