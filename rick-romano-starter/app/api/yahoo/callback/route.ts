// app/api/yahoo/callback/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state') || '';
  const makeUrl =
    process.env.MAKE_CONNECTOR_URL || process.env.NEXT_PUBLIC_MAKE_CONNECTOR_URL;

  if (!code) return new NextResponse('Missing code', { status: 400 });
  if (!makeUrl) return new NextResponse('Missing MAKE_CONNECTOR_URL', { status: 500 });

  try {
    await fetch(makeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: 'yahoo', code, state }),
      // This is a fire-and-forget handoff; we don’t need Make’s response to continue.
    });
  } catch (e) {
    // Don’t block the user on Make errors—log and continue.
    console.error('Make handoff failed', e);
  }

  // Return the user to the dashboard with a little toast cue
  const redirect = new URL('/dashboard?connected=yahoo', new URL(req.url).origin);
  return NextResponse.redirect(redirect.toString());
}
