import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { initPostHog } from '@/lib/posthog'

export const metadata = {
  title: 'Rick Romano — Your League. Your Drama.',
  description: 'Connect Sleeper or Yahoo and get a weekly podcast that recaps your league with swagger.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Client init for PH done in children using useEffect
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
