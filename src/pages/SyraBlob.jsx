import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ORG = 'Revalex-Technologies'
const REPO = 'Syra-Browser'

function humanPath(arr) {
  return arr.filter(Boolean).join('/')
}

export default function SyraBlob() {
  const { branch = 'main', '*': rest } = useParams()
  const navigate = useNavigate()
  const parts = (rest || '').split('/').filter(Boolean)
  const filename = parts[parts.length - 1] || ''

  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [isImage, setIsImage] = useState(false)

  useEffect(() => {
    const p = humanPath(parts)
    const raw = `https://raw.githubusercontent.com/${ORG}/${REPO}/${branch}/${p}`
    setUrl(raw)
    setIsImage(/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(filename))
  }, [branch, rest])

  useEffect(() => {
    async function load() {
      if (!url) return
      if (!isImage) {
        const r = await fetch(url)
        const t = await r.text()
        setText(t)
        setTimeout(() => { if (window.hljs) document.querySelectorAll('.code-view code').forEach(el => window.hljs.highlightElement(el)) }, 0)
      }
    }
    load()
  }, [url, isImage])

  return (
    <div>
      <Navbar />
      <main className="gh-container blob-wrap">
        <div className="mb-3 flex items-center justify-between">
          <div className="gh-breadcrumbs">
            <Link to="/projects/syra" className="link">/{REPO}</Link>
            {parts.map((p, i) => (
              <span key={i}>
                <span className="sep">/</span>
                {i < parts.length - 1 ? (
                  <a className="link cursor-pointer" onClick={() => navigate(`/projects/syra/blob/${branch}/${encodeURIComponent(parts.slice(0,i+1).join('/'))}`)}>{p}</a>
                ) : <span>{p}</span>}
              </span>
            ))}
          </div>
          <div className="file-actions">
            <a className="btn btn-ghost" href={url} download>Download</a>
            <a className="btn btn-primary" href={url} target="_blank" rel="noreferrer">Raw</a>
          </div>
        </div>

        <div className="gh-card">
          <div className="text-lg font-semibold mb-3">{filename}</div>
          {isImage ? (
            <img src={url} alt={filename} className="max-w-full rounded-lg border" />
          ) : (
            <pre className="code-view"><code>{text}</code></pre>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
