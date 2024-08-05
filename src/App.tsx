import { useContext } from 'react'
import { MenuContext } from './components/navMenu/MenuContext'

import Header from "./layouts/Header";
import { Outlet } from "react-router-dom";
import { Nav } from './components/navMenu/Nav';


export default function App() {
  const { handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd } = useContext(MenuContext)

  return (
      <div
        style={{ minHeight: '100dvh' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Header>
          <h1>Press and Hold for 1 Second To View the Menu</h1>
          <Nav />
        </Header>
        <Outlet />
      </div>
  )
}
