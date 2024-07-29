import App from './App'
import { Elevate } from './pages/elevate'
import { Empower } from './pages/empower'
import { Future } from './pages/future'
import { Socket } from './pages/socket'
import { Space } from './pages/space'
import { Vision } from './pages/vision'
import { PageTheme } from './layouts/themes/PageTheme'

export const navigation = [
  {
    path: '/',
    element: 
      <PageTheme pageTheme="home" pageThemeMode="light">
        <App />
      </PageTheme>
  },
  {
    path: 'pages',
    children: [
      {
        path: 'elevate',
        element: (
          <PageTheme pageTheme="elevate" pageThemeMode="light">
            <Elevate />
          </PageTheme>
        ),
      },
      {
        path: 'empower',
        element: (
          <PageTheme pageTheme="empower" pageThemeMode="light">
            <Empower />
          </PageTheme>
        ),
      },
      {
        path: 'future',
        element: (
          <PageTheme pageTheme="future" pageThemeMode="light">
            <Future />
          </PageTheme>
        ),
      },
      {
        path: 'socket',
        element: (
          <PageTheme pageTheme="socket" pageThemeMode="dark">
            <Socket />
          </PageTheme>
        ),
      },
      {
        path: 'space',
        element: (
          <PageTheme pageTheme="space" pageThemeMode="dark">
            <Space />
          </PageTheme>
        ),
      },
      {
        path: 'vision',
        element: (
          <PageTheme pageTheme="vision" pageThemeMode="dark">
            <Vision />
          </PageTheme>
        ),
      },
    ],
  },
]