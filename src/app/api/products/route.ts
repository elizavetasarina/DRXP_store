import { NextRequest, NextResponse } from 'next/server'
import { PRODUCTS } from '@/lib/constants'
import type { Product } from '@/types/product'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const category = searchParams.get('category')
  const sort = searchParams.get('sort')
  const search = searchParams.get('search')
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const limit = Math.max(1, Math.min(100, Number(searchParams.get('limit')) || 12))

  let filtered: Product[] = [...PRODUCTS]

  if (category) {
    filtered = filtered.filter((p) => p.categoryId === category)
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q))
  }

  switch (sort) {
    case 'newest':
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const products = filtered.slice(start, start + limit)

  return NextResponse.json({ products, total, page, totalPages })
}
