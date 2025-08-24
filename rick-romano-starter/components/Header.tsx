import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-full bg-primary"></span>
          <span className="font-bold">Rick Romano</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm">Dashboard</Link>
          <a href="https://x.com" target="_blank" className="text-sm">Twitter</a>
        </nav>
      </div>
    </header>
  )
}
