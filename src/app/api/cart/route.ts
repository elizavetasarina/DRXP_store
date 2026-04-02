import { NextRequest, NextResponse } from 'next/server'

// Placeholder: real cart lives in Zustand/localStorage on the client.
// This route exists for future server-side cart support.

export async function GET() {
  return NextResponse.json({ items: [], total: 0 })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ success: true, item: body })
}
