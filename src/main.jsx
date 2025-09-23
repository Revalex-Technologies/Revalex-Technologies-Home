import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Selenix from './pages/Selenix'
import Labs from './pages/Labs'

const router = createHashRouter([
  { path: '/', element: <Home /> },
  { path: '/projects', element: <Projects /> },
  { path: '/projects/selenix', element: <Selenix /> },
  { path: '/labs', element: <Labs /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
