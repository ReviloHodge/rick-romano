'use client'

import { useEffect, useState } from 'react'
import { initPostHog, track } from '@/lib/posthog'

export default function Dashboard() {
  const [username, setUsername] = useState('')
  const [season, setSeason] = useState(new Date().getFullYear().toString())
  const [status, setStatus] = useState<string>('')

  useEffect(() => { initPostHog(); track('page_view', { path: '/dashboard' }) }, [])

  async function connectSleeper() {
    try {
      setStatus('Connecting to Sleeper…')
      const res = await fetch(process.env.NEXT_PUBLIC_MAKE_CONNECTOR_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'sleeper', sleeper_username: username, season })
      })
      if (!res.ok) throw new Error('Connector failed')
      track('oauth_success', { provider: 'sleeper' })
      setStatus('Connected! Ingesting last week…')
    } catch (e:any) {
      setStatus('Error connecting: ' + e.message)
    }
  }

  async function generateEpisode() {
    try {
      setStatus('Generating episode…')
      const res = await fetch(process.env.NEXT_PUBLIC_MAKE_GENERATE_URL!, { method: 'POST' })
      if (!res.ok) throw new Error('Generate failed')
      setStatus('Rendering… watch email for link.')
    } catch (e:any) {
      setStatus('Error generating: ' + e.message)
    }
  }

  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="card space-y-3">
        <h2 className="font-semibold">Connect Sleeper</h2>
        <div className="flex gap-2">
          <input className="border rounded px-3 py-2 flex-1" placeholder="Sleeper username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="border rounded px-3 py-2 w-32" placeholder="Season" value={season} onChange={e=>setSeason(e.target.value)} />
          <button className="btn btn-primary" onClick={connectSleeper}>Connect</button>
        </div>
        <p className="text-sm text-gray-600">Yahoo users: start from landing. You’ll be redirected to Yahoo to authorize.</p>
      </div>

      <div className="card space-y-3">
        <h2 className="font-semibold">Generate Episode</h2>
        <button className="btn btn-primary" onClick={generateEpisode}>Generate This Week&apos;s Recap</button>
        <p className="text-sm text-gray-500">We’ll email you when it’s ready.</p>
      </div>

      <p className="text-sm">{status}</p>
    </div>
  )
}
