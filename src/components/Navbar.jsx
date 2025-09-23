import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="assets/logo.svg" alt="Revalex logo" className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight">Revalex Technologies</span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className="nav-link px-3 py-2 rounded-lg hover:bg-gray-100">Home</NavLink>
          <NavLink to="/projects" className="nav-link px-3 py-2 rounded-lg hover:bg-gray-100">Projects</NavLink>
          <NavLink to="/labs" className="nav-link px-3 py-2 rounded-lg hover:bg-gray-100">Labs</NavLink>

          <span className="mx-2 h-5 w-px bg-gray-200" aria-hidden="true" />

          <NavLink
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-red)] px-4 py-2 text-white shadow hover:opacity-95 transition"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white/90"></span>
            Explore
          </NavLink>

          <a
            href="https://github.com/Revalex-Technologies"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-gray-800 hover:border-gray-400 hover:bg-gray-50 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="-ml-1">
              <path d="M12 .5A12 12 0 0 0 0 12.7c0 5.4 3.4 10 8.2 11.6.6.1.8-.2.8-.5v-2c-3.3.8-4-1.6-4-1.6-.6-1.5-1.4-1.9-1.4-1.9-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.6-1.4-5.6-6.3 0-1.4.5-2.5 1.2-3.4 0-.3-.5-1.6.1-3.3 0 0 1-.3 3.5 1.3a11.6 11.6 0 0 1 6.4 0c2.5-1.6 3.5-1.3 3.5-1.3.6 1.7.1 3 .1 3.3.8.9 1.2 2 1.2 3.4 0 4.9-2.9 6-5.6 6.3.4.3.8 1 .8 2v3c0 .3.2.6.8.5A12.2 12.2 0 0 0 24 12.7 12 12 0 0 0 12 .5z"/>
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
