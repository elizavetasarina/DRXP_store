export interface PaymentCreateParams {
  orderId: string
  amount: number // kopecks
  currency?: string
  description?: string
  returnUrl: string
  metadata?: Record<string, string>
}

export interface PaymentResult {
  id: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled'
  confirmationUrl?: string
  errorMessage?: string
}

export interface PaymentGateway {
  name: string
  createPayment(params: PaymentCreateParams): Promise<PaymentResult>
  confirmPayment(paymentId: string): Promise<PaymentResult>
  handleWebhook(body: unknown, signature?: string): Promise<{ orderId: string; status: string }>
}
