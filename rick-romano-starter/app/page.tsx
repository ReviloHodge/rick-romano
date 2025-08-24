'use client'

import { useEffect } from 'react'
import { initPostHog, track } from '@/lib/posthog'
import Link from 'next/link'

export default function Home() {
  useEffect(() => { initPostHog(); track('page_view', { path: '/' }) }, [])
  return (
    <div>
      <section className="container py-16 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold">Your League. Your Drama. Rick Tells It Like It Is.</h1>
        <p className="text-lg text-gray-600">Connect Sleeper or Yahoo. Get a weekly podcast that roasts your rivals and recaps every clutch move.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard" className="btn btn-primary" onClick={()=>track('connect_click', { provider: 'sleeper' })}>Connect Sleeper</Link>
          <a href="/api/yahoo/start" className="btn" onClick={()=>track('connect_click', { provider: 'yahoo' })}>Connect Yahoo (Beta)</a>
        </div>
        <p className="text-xs text-gray-500">You’re in control. Disconnect anytime.</p>
      </section>

      <section className="container grid md:grid-cols-3 gap-4">
        <div className="card"><h3 className="font-semibold mb-2">Connect</h3><p>Hook up Sleeper (username) or Yahoo (OAuth).</p></div>
        <div className="card"><h3 className="font-semibold mb-2">We Pull Last Week</h3><p>Matchups, standings, rosters, waivers, trades, injuries.</p></div>
        <div className="card"><h3 className="font-semibold mb-2">Rick Recaps</h3><p>A custom 4–7 minute podcast you can share.</p></div>
      </section>
    </div>
  )
}
