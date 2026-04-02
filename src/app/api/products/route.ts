import { NextRequest, NextResponse } from 'next/server'
import { productService } from '@/server/services/product.service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const category = searchParams.get('category') ?? undefined
    const search = searchParams.get('search') ?? undefined
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.max(1, Math.min(100, Number(searchParams.get('limit')) || 12))

    // Normalize sort param to repository format
    const sortRaw = searchParams.get('sort')
    const sortMap: Record<string, string> = {
      'price-asc': 'price_asc',
      'price_asc': 'price_asc',
      'price-desc': 'price_desc',
      'price_desc': 'price_desc',
      'name': 'name_asc',
      'name_asc': 'name_asc',
    }
    const sort = sortRaw ? (sortMap[sortRaw] ?? undefined) : undefined

    const result = await productService.getProducts({ category, sort, search, page, limit })

    return NextResponse.json(result)
  } catch (error) {
    console.error('[GET /api/products]', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
