import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.YAHOO_CLIENT_ID!
  const redirect = process.env.YAHOO_REDIRECT_URI!
  const scope = encodeURIComponent('fspt-w') // Yahoo Fantasy Sports read (example; adjust if needed)
  const state = 'rr-' + Math.random().toString(36).slice(2)
  const authUrl = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&response_type=code&scope=${scope}&state=${state}`
  return NextResponse.redirect(authUrl)
}
