import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ensureMarked() {
  if (window.marked && window.markedGfmHeadingId) {
    window.marked.use(window.markedGfmHeadingId.gfmHeadingId())
    return Promise.resolve(window.marked)
  }
  if (window.__markedPromise) return window.__markedPromise
  window.__markedPromise = new Promise((resolve, reject) => {
    const finish = () => {
      if (window.marked && window.markedGfmHeadingId) {
        window.marked.use(window.markedGfmHeadingId.gfmHeadingId())
        resolve(window.marked)
      }
    }
    if (!window.marked) {
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
      s.onload = finish
      s.onerror = reject
      document.head.appendChild(s)
    }
    if (!window.markedGfmHeadingId) {
      const s2 = document.createElement('script')
      s2.src = 'https://cdn.jsdelivr.net/npm/marked-gfm-heading-id/lib/index.umd.js'
      s2.onload = finish
      s2.onerror = reject
      document.head.appendChild(s2)
    }
    setTimeout(finish, 0)
  })
  return window.__markedPromise
}

const ORG = 'Revalex-Technologies'
const REPO = 'Syra-Browser'

function humanSize(bytes) {
  if (!bytes) return '-'
  const units = ['B','KB','MB','GB']
  let i = 0, b = bytes
  while (b >= 1024 && i < units.length - 1) { b/=1024; i++ }
  return `${b.toFixed(i===0?0:2)} ${units[i]}`
}

function rewriteRelativeImages(md, baseRaw) {
  md = md.replace(/!\[(.*?)\]\((?!https?:\/\/|data:)(.*?)\)/g, (_m, alt, path) => {
    const clean = (path || '').trim().replace(/^\.\//,'').replace(/^\//,'')
    return `![${alt}](${baseRaw}${clean})`
  })
  md = md.replace(/<img([^>]*?)src=["'](?!https?:\/\/|data:)([^"']+)["']([^>]*)>/gi, (_m, pre, src, post) => {
    const clean = (src || '').trim().replace(/^\.\//,'').replace(/^\//,'')
    return `<img${pre}src="${baseRaw}${clean}"${post}>`
  })
  return md
}

function rewriteRelativeLinks(md, branch, basePath) {
  const toBlob = (p) => `#/projects/syra/blob/${branch}/${encodeURI(p)}`
  const toTree = (p) => `#/projects/syra/tree/${branch}/${encodeURI(p)}`
  const resolve = (href) => {
    let clean = (href || '').trim()
    if (!clean || clean.startsWith('#') || /^(?:https?:|data:)/i.test(clean)) return href
    let frag = ''
    const idx = clean.indexOf('#')
    if (idx >= 0) { frag = clean.slice(idx); clean = clean.slice(0, idx) }
    clean = clean.replace(/^\.\//,'').replace(/^\//,'')
    const full = basePath ? `${basePath}/${clean}` : clean
    const isFile = /\.(md|markdown|txt|json|ya?ml|js|ts|tsx|jsx|css|html|png|jpe?g|gif|webp|svg)$/i.test(clean)
    return (isFile ? toBlob(full) : toTree(full)) + frag
  }
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => `[${text}](${resolve(href)})`)
  md = md.replace(/<a([^>]*?)href=["']([^"']+)["']([^>]*)>/gi, (_m, pre, href, post) => `<a${pre}href="${resolve(href)}"${post}>`)
  return md
}

function Markdown({ source, baseRaw, branch, basePath }) {
  const [html, setHtml] = useState('')
  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!source) { if (!cancelled) setHtml(''); return }
      let md = source
      if (baseRaw) md = rewriteRelativeImages(md, baseRaw)
      md = rewriteRelativeLinks(md, branch || 'main', basePath || '')
      try {
        const marked = await ensureMarked()
        marked.setOptions({ gfm: true, smartypants: true, headerIds: true, mangle: false, breaks: false })
        const out = marked.parse(md)
        if (!cancelled) setHtml(out)
        setTimeout(() => { if (window.hljs) document.querySelectorAll('.markdown-body pre code').forEach(el => window.hljs.highlightElement(el)) }, 0)
      } catch {
        if (!cancelled) setHtml(md.replace(/\n/g, '<br/>'))
      }
    }
    run()
    return () => { cancelled = true }
  }, [source, baseRaw, branch, basePath])
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
}

function RepoBrowser({ branch }) {
  const [path, setPath] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [readme, setReadme] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        if (!branch) return
        setLoading(true)
        setError('')
        const url = `https://api.github.com/repos/${ORG}/${REPO}/contents/${path}?ref=${branch}`
        const res = await fetch(url)
        if (!res.ok) throw new Error('GitHub API error ' + res.status)
        let data = await res.json()
        data = data.sort((a,b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1))
        setItems(data)

        const candidates = ['README.md','Readme.md','readme.md']
        let md = ''
        for (const c of candidates) {
          const r = await fetch(`https://raw.githubusercontent.com/${ORG}/${REPO}/${branch}/${path ? path + '/' : ''}${c}`)
          if (r.ok) { md = await r.text(); break }
        }
        setReadme(md)
      } catch (e) {
        setError(e.message || 'Failed to load contents')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [path, branch])

  const crumbs = path.split('/').filter(Boolean)
  const baseRaw = `https://raw.githubusercontent.com/${ORG}/${REPO}/${branch}/${path ? path + '/' : ''}`

  return (
    <div className="space-y-4">
      <div className="gh-card">
        <div className="gh-breadcrumbs mb-2">
          <a onClick={() => { setPath('') }} className="link cursor-pointer">/{REPO}</a>
          {crumbs.map((c, i) => (
            <span key={i}>
              <span className="sep">/</span>
              <a onClick={() => { setPath(crumbs.slice(0, i+1).join('/')) }} className="link cursor-pointer">{c}</a>
            </span>
          ))}
        </div>
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && (
          <table className="gh-table text-sm">
            <tbody>
              {items.map((it) => (
                <tr key={it.sha}>
                  <td style={{width:'24px'}}>{it.type === 'dir' ? '📁' : '📄'}</td>
                  <td>
                    {it.type === 'dir'
                      ? <a className="gh-file cursor-pointer" onClick={() => setPath(path ? `${path}/${it.name}` : it.name)}>{it.name}</a>
                      : <a className="gh-file cursor-pointer" onClick={() => navigate(`/projects/syra/blob/${branch}/${encodeURIComponent(path ? path + '/' + it.name : it.name)}`)}>{it.name}</a>
                    }
                  </td>
                  <td className="type" style={{textAlign:'right'}}>{it.type === 'dir' ? 'folder' : humanSize(it.size || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!!readme && (
        <div className="gh-readme readme-wrap">
          <h2 className="gh-heading mb-3">README</h2>
          <Markdown source={readme} baseRaw={baseRaw} branch={branch} basePath={path} />
        </div>
      )}
    </div>
  )
}

export default function Syra() {
  const [repo, setRepo] = useState(null)
  const [branch, setBranch] = useState(null)

  useEffect(() => {
    async function load() {
      const r = await fetch(`https://api.github.com/repos/${ORG}/${REPO}`)
      if (r.ok) {
        const data = await r.json()
        setRepo(data)
        setBranch(data.default_branch || 'main')
      }
    }
    load()
  }, [])

  return (
    <div>
      <Navbar />
      <main className="gh-container">
        <div className="mb-3">
          <h1 className="text-2xl font-semibold">{ORG} / <span className="font-bold">{REPO}</span></h1>
          {repo && (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {(repo.topics || []).map(t => <span key={t} className="gh-badge">#{t}</span>)}
              <span className="gh-badge">★ {repo.stargazers_count}</span>
            </div>
          )}
        </div>

          <a href={`https://github.com/${ORG}/${REPO}`} target="_blank" rel="noreferrer" className="btn btn-ghost inline-flex items-center gap-2"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 .2a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.24.49-2.71-1.08-2.71-1.08-.36-.92-.88-1.17-.88-1.17-.72-.49.06-.48.06-.48.8.06 1.23.83 1.23.83.71 1.21 1.86.86 2.31.66.07-.52.28-.86.51-1.06-1.79-.2-3.67-.9-3.67-3.99 0-.88.31-1.6.82-2.17-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.83a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.05 2.2-.83 2.2-.83.44 1.1.16 1.92.08 2.12.51.57.82 1.29.82 2.17 0 3.1-1.88 3.78-3.68 3.98.29.25.54.74.54 1.49v2.21c0 .21.14.46.55.38A8 8 0 0 0 8 .2"/></svg>View Repo on GitHub</a>
        <div className="gh-tabs">
          <button className="gh-tab active">Code</button>
          <Link className="gh-tab" to="/projects/syra/releases">Releases</Link>
        </div>

        <div className="gh-grid mt-0">
          <div>
            <RepoBrowser branch={branch} />
          </div>
          <aside className="space-y-4">
            {repo && (
              <div className="gh-card">
                <div className="gh-heading mb-2">About</div>
                <p className="gh-sub">{repo.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(repo.topics || []).map(t => <span key={t} className="gh-badge">{t}</span>)}
                </div>
                <div className="mt-3 gh-sub">Default branch: {branch || '...'}</div>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
