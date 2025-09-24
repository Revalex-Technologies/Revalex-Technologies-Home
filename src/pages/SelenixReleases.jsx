import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ORG = 'Revalex-Technologies'
const REPO = 'Selenix-Browser'

function humanDate(s) {
  return new Date(s).toLocaleString()
}

export default function SelenixReleases() {
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`https://api.github.com/repos/${ORG}/${REPO}/releases?per_page=100`)
        if (!res.ok) throw new Error('GitHub API error ' + res.status)
        const data = await res.json()
        setReleases(data)
      } catch (e) {
        setError(e.message || 'Failed to load releases')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <Navbar />
      <main className="gh-container">
        <div className="mb-3">
          <h1 className="text-2xl font-semibold">Selenix Browser — Releases</h1>
        </div>
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        <div className="grid gap-3">
          {releases.map(r => (
            <div key={r.id} className="gh-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{r.name || r.tag_name}</div>
                  <div className="gh-sub">Published {humanDate(r.published_at || r.created_at)}</div>
                </div>
                <Link className="btn btn-primary" to={`/projects/selenix/releases/${encodeURIComponent(r.tag_name)}`}>Open</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
