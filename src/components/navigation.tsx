import App from '../App'
import { Elevate } from '../pages/elevate'
import { Empower } from '../pages/empower'
import { Future } from '../pages/future'
import { Socket } from '../pages/socket'
import { Space } from '../pages/space'
import { Vision } from '../pages/vision'
import { PageTheme } from '../layouts/PageTheme'

export const navigation = [
  {
    path: '/',
    loader: false,
    element: <App />
  },
  {
    path: 'pages',
    children: [
      {
        path: 'elevate',
        loader: false,
        element: (
          <PageTheme pageTheme="elevate" pageThemeMode="light">
            <Elevate />
          </PageTheme>
        ),
      },
      {
        path: 'empower',
        loader: false,
        element: (
          <PageTheme pageTheme="empower" pageThemeMode="light">
            <Empower />
          </PageTheme>
        ),
      },
      {
        path: 'future',
        loader: false,
        element: (
          <PageTheme pageTheme="future" pageThemeMode="light">
            <Future />
          </PageTheme>
        ),
      },
      {
        path: 'socket',
        loader: false,
        element: (
          <PageTheme pageTheme="socket" pageThemeMode="dark">
            <Socket />
          </PageTheme>
        ),
      },
      {
        path: 'space',
        loader: false,
        element: (
          <PageTheme pageTheme="space" pageThemeMode="dark">
            <Space />
          </PageTheme>
        ),
      },
      {
        path: 'vision',
        loader: false,
        element: (
          <PageTheme pageTheme="vision" pageThemeMode="dark">
            <Vision />
          </PageTheme>
        ),
      },
    ],
  },
]