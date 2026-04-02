import { NextRequest, NextResponse } from 'next/server'
import { StubGateway } from '@/lib/payment/stub'

const gateway = new StubGateway()

export async function POST(request: NextRequest) {
  const { orderId, amount, gateway: gatewayName } = (await request.json()) as {
    orderId: string
    amount: number
    gateway?: string
  }

  if (!orderId || !amount) {
    return NextResponse.json(
      { error: 'orderId and amount are required' },
      { status: 400 },
    )
  }

  const result = await gateway.createPayment({
    orderId,
    amount,
    returnUrl: `${request.nextUrl.origin}/orders/${orderId}/confirmation`,
  })

  return NextResponse.json(result)
}
