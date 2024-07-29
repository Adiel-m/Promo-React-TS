import App from './App'
import { Elevate } from './pages/elevate'
import { Empower } from './pages/empower'
import { Future } from './pages/future'
import { Socket } from './pages/socket'
import { Space } from './pages/space'
import { Vision } from './pages/vision'
import { PageTheme } from './themes/PageTheme'

export const navigation = [
  {
    path: '/',
    element: 
      <PageTheme pageTheme="home" theme="light">
        <App />
      </PageTheme>
  },
  {
    path: 'pages',
    children: [
      {
        path: 'elevate',
        element: (
          <PageTheme pageTheme="elevate" theme="light">
            <Elevate />
          </PageTheme>
        ),
      },
      {
        path: 'empower',
        element: (
          <PageTheme pageTheme="empower" theme="light">
            <Empower />
          </PageTheme>
        ),
      },
      {
        path: 'future',
        element: (
          <PageTheme pageTheme="future" theme="light">
            <Future />
          </PageTheme>
        ),
      },
      {
        path: 'socket',
        element: (
          <PageTheme pageTheme="socket" theme="dark">
            <Socket />
          </PageTheme>
        ),
      },
      {
        path: 'space',
        element: (
          <PageTheme pageTheme="space" theme="dark">
            <Space />
          </PageTheme>
        ),
      },
      {
        path: 'vision',
        element: (
          <PageTheme pageTheme="vision" theme="dark">
            <Vision />
          </PageTheme>
        ),
      },
    ],
  },
]