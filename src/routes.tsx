import App from './App'
import { Elevate } from './pages/elevate/elevate'
import { Empower } from './pages/empower/empower'
import { Future } from './pages/future/future'
import { Pages } from './pages/Pages'
import { Socket } from './pages/socket/socket'
import { Space } from './pages/space/space'
import { Vision } from './pages/vision/vision'

export const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'pages',
    element: <Pages />,
    children: [
      {
        path: 'elevate',
        element: <Elevate />,
      },
      {
        path: 'empower',
        element: <Empower />,
      },
      {
        path: 'future',
        element: <Future />,
      },
      {
        path: 'socket',
        element: <Socket />,
      },
      {
        path: 'space',
        element: <Space />,
      },
      {
        path: 'vision',
        element: <Vision />,
      },
    ],
  },
]