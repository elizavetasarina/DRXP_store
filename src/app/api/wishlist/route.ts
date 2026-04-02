import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ items: [] })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ success: true, item: body })
}

export async function DELETE(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ success: true, removed: body })
}
