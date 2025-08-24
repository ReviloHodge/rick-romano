// app/api/yahoo/start/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.YAHOO_CLIENT_ID!;
  const redirectUri = process.env.YAHOO_REDIRECT_URI!;
  // Read-only Fantasy Sports scope
  const scope = encodeURIComponent('fspt-r');

  if (!clientId || !redirectUri) {
    // Surface a helpful message in the browser if envs are missing
    return new NextResponse(
      'Missing YAHOO_CLIENT_ID or YAHOO_REDIRECT_URI env var',
      { status: 500 }
    );
  }

  // simple CSRF token; you can store/verify it later if you want
  const state = `rr-${Math.random().toString(36).slice(2, 10)}`;

  const url =
    `https://api.login.yahoo.com/oauth2/request_auth` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&state=${encodeURIComponent(state)}`;

  return NextResponse.redirect(url);
}
