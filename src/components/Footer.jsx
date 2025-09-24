export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500 flex flex-wrap gap-4 md:gap-6 md:flex-nowrap md:items-center md:justify-between">
        <p className="order-2 w-full md:order-1 md:w-auto">© {new Date().getFullYear()} Revalex Technologies • Built with ♥</p>
        <div className="order-1 w-full md:order-2 md:w-auto flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="https://github.com/Revalex-Technologies" className="text-gray-600 hover:text-[var(--brand-red)] whitespace-nowrap" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/orgs/Revalex-Technologies/repositories" className="text-gray-600 hover:text-[var(--brand-red)] whitespace-nowrap" target="_blank" rel="noreferrer">Repositories</a>
        </div>
      </div>
    </footer>
  )
}
