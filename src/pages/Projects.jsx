import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RepoCard from '../components/RepoCard'

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('https://api.github.com/orgs/Revalex-Technologies/repos?type=public&per_page=100&sort=updated')
        if (!res.ok) throw new Error('GitHub API error ' + res.status)
        const data = await res.json()
        data.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
        setRepos(data)
      } catch (e) {
        setError(e.message || 'Failed to load repositories')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="mt-2 text-gray-600">Public repositories from our GitHub organization.</p>
          </div>
          <a className="btn btn-primary" href="https://github.com/orgs/Revalex-Technologies/repositories" target="_blank" rel="noreferrer">All Repositories</a>
        </div>

        {loading && <p>Loading repositories…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
