import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Selenix() {
  return (
    <div>
      <Navbar />
      <section className="border-b bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <img
              src="assets/selenix-browser.png"
              alt="Selenix Browser"
              className="w-full rounded-2xl border shadow"
            />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Selenix Browser</h1>
              <p className="mt-3 text-gray-700">
                Selenix is our fast, minimal, developer‑friendly browser.
              </p>
              <h2 className="mt-4 text-base font-semibold">Features</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                <li><strong>Bookmarks Manager</strong> — organize with folders, drag & drop, and quick search.</li>
                <li><strong>Downloads Web UI</strong> — clean status view with pause/resume and “open in folder”.</li>
                <li><strong>History</strong> — filter and search your browsing history quickly.</li>
                <li><strong>New Tab</strong> — minimal dashboard with clock and shortcuts.</li>
                <li><strong>Keyboard Shortcuts</strong> — power‑user actions without leaving the keys.</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a className="btn btn-primary" href="https://github.com/Revalex-Technologies/Selenix-Browser" target="_blank" rel="noreferrer">Visit Project</a>
                <a className="btn btn-ghost" href="/#/projects">Back to Projects</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card">
            <h3 className="text-lg font-semibold">Why Selenix?</h3>
            <p className="mt-2 text-sm text-gray-700">
              A browser that looks sharp, feels fast, and keeps engineering tasks simple.
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Open Source</h3>
            <p className="mt-2 text-sm text-gray-700">
              Built in the open for transparency and momentum.
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Get involved</h3>
            <p className="mt-2 text-sm text-gray-700">
              Star the repo, file issues, and help shape the roadmap — contributions welcome.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
