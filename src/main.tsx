import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Elevate } from './pages/elevate'
import { Empower } from './pages/empower'
import { Future } from './pages/future'
import { Socket } from './pages/socket'
import { Space } from './pages/space'
import { Vision } from './pages/vision'

const router = createBrowserRouter([
  {
    path: '/',
    loader: false,
    element: <App />,
  },
  {
    path: '/pages/',
    children: [
      {
        path: 'elevate',
        loader: false,
        element: <Elevate />,
      },
      {
        path: 'empower',
        loader: false,
        element: <Empower />,
      },
      {
        path: 'future',
        loader: false,
        element: <Future />,
      },
      {
        path: 'socket',
        loader: false,
        element: <Socket />,
      },
      {
        path: 'space',
        loader: false,
        element: <Space />,
      },
      {
        path: 'vision',
        loader: false,
        element: <Vision />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
