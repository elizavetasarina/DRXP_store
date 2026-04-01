import { PaymentCreateParams, PaymentGateway, PaymentResult } from './types'

const MOCK_DELAY_MS = 1500

function generateId(): string {
  return `stub_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

const payments = new Map<string, { orderId: string; status: PaymentResult['status'] }>()

export class StubGateway implements PaymentGateway {
  name = 'stub'

  async createPayment(params: PaymentCreateParams): Promise<PaymentResult> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

    const id = generateId()
    payments.set(id, { orderId: params.orderId, status: 'pending' })

    return {
      id,
      status: 'pending',
      confirmationUrl: `${params.returnUrl}?paymentId=${id}`,
    }
  }

  async confirmPayment(paymentId: string): Promise<PaymentResult> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

    const payment = payments.get(paymentId)
    if (!payment) {
      return { id: paymentId, status: 'failed', errorMessage: 'Payment not found' }
    }

    payment.status = 'succeeded'
    return { id: paymentId, status: 'succeeded' }
  }

  async handleWebhook(body: unknown): Promise<{ orderId: string; status: string }> {
    const { paymentId } = body as { paymentId: string }
    const payment = payments.get(paymentId)

    if (!payment) {
      throw new Error(`Unknown payment: ${paymentId}`)
    }

    return { orderId: payment.orderId, status: payment.status }
  }
}
