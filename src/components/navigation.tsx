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
    path: '/pages/',
    children: [
      {
        path: 'elevate',
        loader: false,
        element: (
          <PageTheme page="elevate" pageThemeMode="light">
            <Elevate />
          </PageTheme>
        ),
      },
      {
        path: 'empower',
        loader: false,
        element: (
          <PageTheme page="empower" pageThemeMode="light">
            <Empower />
          </PageTheme>
        ),
      },
      {
        path: 'future',
        loader: false,
        element: (
          <PageTheme page="future" pageThemeMode="light">
            <Future />
          </PageTheme>
        ),
      },
      {
        path: 'socket',
        loader: false,
        element: (
          <PageTheme page="socket" pageThemeMode="dark">
            <Socket />
          </PageTheme>
        ),
      },
      {
        path: 'space',
        loader: false,
        element: (
          <PageTheme page="space" pageThemeMode="dark">
            <Space />
          </PageTheme>
        ),
      },
      {
        path: 'vision',
        loader: false,
        element: (
          <PageTheme page="vision" pageThemeMode="dark">
            <Vision />
          </PageTheme>
        ),
      },
    ],
  },
]