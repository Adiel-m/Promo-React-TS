import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './themes/ThemeContext'
import { routes } from './routes'
import { MenuProvider } from './components/navMenu/MenuContext'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <MenuProvider>
        <RouterProvider router={router} />
      </MenuProvider>
    </ThemeProvider>
  </React.StrictMode>
)