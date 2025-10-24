import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Syra from './pages/Syra'
import SyraTree from './pages/SyraTree'
import SyraBlob from './pages/SyraBlob'
import SyraReleases from './pages/SyraReleases'
import SyraRelease from './pages/SyraRelease'
import Labs from './pages/Labs'

const router = createHashRouter([
  { path: '/', element: <Home /> },
  { path: '/projects', element: <Projects /> },
  { path: '/projects/syra', element: <Syra /> },
  { path: '/projects/syra', element: <Syra /> },
  { path: '/projects/syra/tree/:branch/*', element: <SyraTree /> },
  { path: '/projects/syra/blob/:branch/*', element: <SyraBlob /> },
  { path: '/projects/syra/releases', element: <SyraReleases /> },
  { path: '/projects/syra/releases/:tag', element: <SyraRelease /> },
  { path: '/labs', element: <Labs /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
