'use client'
import posthog from 'posthog-js'

let inited = false
export function initPostHog() {
  if (inited) return
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
  if (!key) return
  posthog.init(key, { api_host: host, capture_pageview: true })
  inited = true
}

export function track(event: string, properties?: Record<string, any>) {
  try { posthog.capture(event, properties) } catch {}
}
