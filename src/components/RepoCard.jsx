import { Link } from 'react-router-dom'

export default function RepoCard({ repo }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{repo.name}</h3>
          {repo.description && <p className="mt-1 text-sm text-gray-600">{repo.description}</p>}
        </div>
        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.3l-6.2 3.7 1.6-6.9L2 9.5l7-.6L12 2l3 6.9 7 .6-5.4 4.6 1.6 6.9z"/></svg>
          {repo.stargazers_count ?? 0}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
        <span>{repo.language ?? '—'}</span>
        <span>•</span>
        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      <div className="mt-5 flex gap-3">
        <a className="btn btn-primary" href={repo.html_url} target="_blank" rel="noreferrer">Visit Project</a>
        {repo.name.toLowerCase().includes('selenix') && (
          <Link className="btn btn-ghost" to="/projects/selenix">Learn more</Link>
        )}
      </div>
    </div>
  )
}
