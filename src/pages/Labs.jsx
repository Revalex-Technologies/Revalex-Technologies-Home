import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useRef, useState } from 'react'

function SnakeGame() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const size = 16
    let speed = 110
    let dir = {x: 1, y: 0}
    let snake = [{x: 8, y: 8}]
    let food = {x: 12, y: 8}
    let alive = true
    let frame

    const placeFood = () => {
      food = { x: Math.floor(Math.random()* (canvas.width/size)), y: Math.floor(Math.random()* (canvas.height/size)) }
    }

    const onKey = (e) => {
      const k = e.key.toLowerCase()
      if (k === 'arrowup' || k === 'w') dir = {x: 0, y: -1}
      if (k === 'arrowdown' || k === 's') dir = {x: 0, y: 1}
      if (k === 'arrowleft' || k === 'a') dir = {x: -1, y: 0}
      if (k === 'arrowright' || k === 'd') dir = {x: 1, y: 0}
    }
    window.addEventListener('keydown', onKey)

    let last = 0
    function loop(t) {
      frame = requestAnimationFrame(loop)
      if (t - last < speed) return
      last = t

      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }

      const cols = canvas.width/size, rows = canvas.height/size
      head.x = (head.x + cols) % cols
      head.y = (head.y + rows) % rows

      if (snake.some(p => p.x === head.x && p.y === head.y)) {
        alive = false
      }

      snake.unshift(head)

      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 1)
        speed = Math.max(60, speed - 2)
        placeFood()
      } else {
        snake.pop()
      }

      ctx.clearRect(0,0,canvas.width, canvas.height)

      ctx.fillStyle = '#f8fafc'
      ctx.fillRect(0,0,canvas.width, canvas.height)

      ctx.fillStyle = '#e50914'
      ctx.fillRect(food.x*size, food.y*size, size, size)

      ctx.fillStyle = '#111827'
      snake.forEach(p => ctx.fillRect(p.x*size, p.y*size, size, size))

      if (!alive) {
        cancelAnimationFrame(frame)
        ctx.fillStyle = 'rgba(17,24,39,0.85)'
        ctx.fillRect(0,0,canvas.width, canvas.height)
        ctx.fillStyle = 'white'
        ctx.font = 'bold 20px ui-sans-serif, system-ui'
        ctx.fillText('Game Over – press R to restart', 20, canvas.height/2)
      }
    }
    frame = requestAnimationFrame(loop)

    const onR = (e) => {
      if ((e.key || '').toLowerCase() === 'r') {
        setScore(0)
        speed = 110
        dir = {x:1, y:0}
        snake = [{x:8,y:8}]
        placeFood()
        alive = true
        last = 0
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(loop)
      }
    }
    window.addEventListener('keydown', onR)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keydown', onR)
    }
  }, [])

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Snake (WASD / Arrows)</h3>
        <div className="rounded-full bg-gray-100 px-3 py-1 text-sm">Score: {score}</div>
      </div>
      <canvas ref={canvasRef} width={416} height={320} className="mt-3 w-full rounded-xl border" />
    </div>
  )
}

export default function Labs() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-extrabold">Labs</h1>
        <p className="mt-3 max-w-2xl text-gray-700">
          A playground for quick experiments—tiny games and UI demos that inform product decisions.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <SnakeGame />
          <div className="card">
            <h3 className="text-lg font-semibold">Button stress test</h3>
            <p className="mt-2 text-gray-700">A sandbox to evaluate focus rings, hover states, and motion.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn rounded-full border border-gray-300">Pill</button>
              <button className="btn bg-gray-900 text-white">Dark</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
