export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="container py-8 text-sm text-gray-500 flex flex-col md:flex-row gap-2 justify-between">
        <p>© {new Date().getFullYear()} Rick Romano • Built for banter.</p>
        <p><a className="underline" href="/privacy">Privacy</a></p>
      </div>
    </footer>
  )
}
