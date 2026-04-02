import { NextResponse } from 'next/server'
import { productService } from '@/server/services/product.service'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    // Route param is named [id] but used as slug in the shop
    const product = await productService.getProductBySlug(id)
    return NextResponse.json({ product })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    if (message.includes('not found')) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    console.error('[GET /api/products/[id]]', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
