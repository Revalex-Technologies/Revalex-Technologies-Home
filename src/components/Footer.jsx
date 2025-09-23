export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Revalex Technologies • Built with ♥</p>
        <div className="flex gap-4">
          <a href="https://github.com/Revalex-Technologies" className="hover:text-[var(--brand-red)]" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/orgs/Revalex-Technologies/repositories" className="hover:text-[var(--brand-red)]" target="_blank" rel="noreferrer">Repositories</a>
        </div>
      </div>
    </footer>
  )
}
