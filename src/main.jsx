import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Selenix from './pages/Selenix'
import SelenixTree from './pages/SelenixTree'
import SelenixBlob from './pages/SelenixBlob'
import SelenixReleases from './pages/SelenixReleases'
import SelenixRelease from './pages/SelenixRelease'
import Labs from './pages/Labs'

const router = createHashRouter([
  { path: '/', element: <Home /> },
  { path: '/projects', element: <Projects /> },
  { path: '/projects/selenix', element: <Selenix /> },
  { path: '/projects/selenix/tree/:branch/*', element: <SelenixTree /> },
  { path: '/projects/selenix/blob/:branch/*', element: <SelenixBlob /> },
  { path: '/projects/selenix/releases', element: <SelenixReleases /> },
  { path: '/projects/selenix/releases/:tag', element: <SelenixRelease /> },
  { path: '/labs', element: <Labs /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
