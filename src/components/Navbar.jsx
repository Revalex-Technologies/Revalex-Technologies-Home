import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `nav-link block px-3 py-2 rounded-lg ${isActive ? 'text-[var(--brand-red)]' : ''}`

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">

          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Revalex Technologies" className="h-9 w-9" />

            <span className="brand-text hidden md:inline text-lg font-semibold tracking-tight">Revalex Technologies</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/projects" className={navLinkClass}>Other Projects</NavLink>
            <NavLink to="/labs" className={navLinkClass}>Labs</NavLink>
              <NavLink onClick={() => setOpen(false)} to="/projects/syra" className={navLinkClass}>Syra Browser</NavLink>

            <div className="ml-3 h-6 w-px bg-gray-200" />

            <a
              href="https://github.com/Revalex-Technologies"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost border-gray-200"
            >
              GitHub
            </a>
          </nav>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border-gray-200"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="pb-4 pt-1">
            <nav className="grid gap-1">
              <NavLink onClick={() => setOpen(false)} to="/" className={navLinkClass} end>Home</NavLink>
              <NavLink onClick={() => setOpen(false)} to="/projects" className={navLinkClass}>Other Projects</NavLink>
              <NavLink onClick={() => setOpen(false)} to="/labs" className={navLinkClass}>Labs</NavLink>
              <NavLink onClick={() => setOpen(false)} to="/projects/syra" className={navLinkClass}>Syra Browser</NavLink>
            </nav>
            <div className="mt-3 grid gap-2">
              <a
                href="https://github.com/Revalex-Technologies"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost border-gray-200 w-full"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
