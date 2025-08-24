import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { mdToHtml } from '@/lib/mdToHtml'

export const revalidate = 0

async function getEpisode(id: string){
  const sb = supabaseAdmin()
  const { data, error } = await sb.from('episode').select('*').eq('id', id).single()
  if (error) return null
  return data as any
}

export default async function EpisodePage({ params }: { params: { id: string } }) {
  const ep = await getEpisode(params.id)
  if (!ep) return <main className="container py-10">Episode not found.</main>
  const html = mdToHtml(ep.script_md || '')
  return (
    <main className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">Week {ep.week} • Rick Recap</h1>
      {ep.audio_url ? (
        <audio controls preload="none" className="w-full" src={ep.audio_url} />
      ) : <p>Rendering audio… check back shortly.</p>}
      <article className="prose" dangerouslySetInnerHTML={{ __html: html as string }} />
    </main>
  )
}
