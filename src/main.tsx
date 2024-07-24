import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { navigation } from './components/navigation'
import { MenuProvider } from './components/navMenu/MenuContext'

const router = createBrowserRouter(navigation)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <MenuProvider>
        <RouterProvider router={router} />
      </MenuProvider>
    </ThemeProvider>
  </React.StrictMode>,
)