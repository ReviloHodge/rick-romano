import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  if (!code) return NextResponse.redirect('/dashboard?yahoo=error')
  // Forward code to Make connector (server-to-server). Make will exchange code->tokens and continue.
  const makeUrl = process.env.MAKE_CONNECTOR_URL
  if (!makeUrl) return NextResponse.redirect('/dashboard?yahoo=missing-make-url')
  await fetch(makeUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider: 'yahoo', code, state })
  })
  return NextResponse.redirect('/dashboard?yahoo=ok')
}
