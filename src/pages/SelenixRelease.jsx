import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function rewriteRelativeLinks(md, branch, basePath){
  const toBlob = (p) => `#/projects/selenix/blob/${branch}/${encodeURIComponent(p)}`
  const toTree = (p) => `#/projects/selenix/tree/${branch}/${encodeURIComponent(p)}`
  const resolve = (href) => {
    let clean = (href || '').trim()
    if (!clean || clean.startsWith('#') || /^(?:https?:|data:)/i.test(clean)) return href
    clean = clean.replace(/^\.\//,'').replace(/^\//,'')
    const isFile = /\.(md|markdown|txt|json|ya?ml|js|ts|tsx|jsx|css|html|png|jpe?g|gif|webp|svg)$/i.test(clean)
    const path = basePath ? `${basePath}/${clean}` : clean
    return isFile ? toBlob(path) : toTree(path)
  }
  // markdown links
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => `[${text}](${resolve(href)})`)
  // html anchors
  md = md.replace(/<a([^>]*?)href=["']([^"']+)["']([^>]*)>/gi, (_m, pre, href, post) => `<a${pre}href="${resolve(href)}"${post}>`)
  return md
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

function ensureMarked() {
  if (window.marked) return Promise.resolve(window.marked);
  if (window.__markedPromise) return window.__markedPromise;
  window.__markedPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    s.onload = () => resolve(window.marked);
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
  return window.__markedPromise;
}

const ORG = 'Revalex-Technologies'
const REPO = 'Selenix-Browser'

function humanSize(bytes) {
  if (bytes === 0 || bytes === null || bytes === undefined) return '-'
  const units = ['B','KB','MB','GB']
  let i = 0
  let b = bytes
  while (b >= 1024 && i < units.length - 1) { b/=1024; i++ }
  return `${b.toFixed( (i===0)?0:2)} ${units[i]}`
}

function Markdown({ source, baseRaw, branch, basePath }) {
  const [html, setHtml] = useState('')
  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!source) { if (!cancelled) setHtml(''); return }
      let md = source
      if (baseRaw) md = rewriteRelativeImages(md, baseRaw)
      try {
        const marked = await ensureMarked()
        marked.setOptions({ gfm: true, breaks: false })
        const out = marked.parse(rewriteRelativeLinks(md, branch||'main', basePath||''))
        if (!cancelled) setHtml(out)
      } catch {
        if (!cancelled) setHtml(md.replace(/\n/g, '<br/>'))
      }
    }
    run()
    return () => { cancelled = true }
  }, [source, baseRaw])
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
}

export default function ReleaseDetail() {
  const { tag } = useParams()
  const [rel, setRel] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError('')
        const r = await fetch(`https://api.github.com/repos/${ORG}/${REPO}/releases/tags/${tag}`)
        if (!r.ok) throw new Error('Not found')
        const data = await r.json()
        setRel(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [tag])

  return (
    <div>
      <Navbar />
      <main className="gh-container">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Release {tag}</h1>
          <Link className="btn btn-ghost" to="/projects/selenix/releases">Back to releases</Link>
        </div>
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {rel && (
          <div className="gh-card">
            <div className="text-lg font-semibold">{rel.name || rel.tag_name}</div>
            <div className="gh-sub mt-1">{new Date(rel.published_at || rel.created_at).toLocaleString()}</div>
            {(rel.body || '').trim().length > 0 && (
              <div className="gh-readme mt-3"><Markdown source={rel.body} /></div>
            )}
            {rel.assets && rel.assets.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Assets</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {rel.assets.map((a) => (
                    <a key={a.id} href={a.browser_download_url} className="gh-download" target="_blank" rel="noreferrer">
                      <span className="truncate">{a.name}</span>
                      <span className="ml-auto gh-sub">{humanSize(a.size)}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
