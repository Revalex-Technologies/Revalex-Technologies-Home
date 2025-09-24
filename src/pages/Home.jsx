import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <Navbar />

      {}
      <section className="hero border-b">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-red)]">
              Soon to be mainstream
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Clean. Minimal. Powerful.</h1>
            <p className="mt-3 max-w-xl text-gray-700">
              We design and build both software and technology products with a sharp focus on reliability and polish.
              Our plan is simple: establish a robust core, build on proven foundations, and iterate
              with precision—so every release feels fast, stable, and thoughtfully crafted.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="btn btn-primary">Explore Projects</Link>
</div>
          </div>
          <div className="relative">
            <img src="assets/hero-illustration.svg" alt="" className="w-full rounded-2xl border shadow-sm" />
          </div>
        </div>
      </section>

      {}
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {title: 'Solid foundations', body: 'We build on reliable, well-tested stacks to minimize surprises and maximize velocity.'},
          {title: 'Deliberate design', body: 'Interfaces that feel familiar, fast, and coherent—consistent spacing, typography, and theming.'},
          {title: 'Shippable quality', body: 'Tight feedback loops, pragmatic scope, and automated checks keep our releases smooth.'},
        ].map((c, i) => (
          <div key={i} className="card">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-gray-700">{c.body}</p>
          </div>
        ))}
      </section>

      {}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="card flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Want a peek behind the curtain?</h3>
            <p className="text-gray-700">Visit Labs to try small games and experiments we use to test UX ideas.</p>
          </div>
          <Link to="/labs" className="btn btn-primary">Open Labs</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
