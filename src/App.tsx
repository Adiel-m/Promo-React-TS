import { useContext } from 'react'
import { MenuContext } from './components/navMenu/MenuContext'

import { Theme } from "./themes/Theme";
import Header from "./layouts/Header";
import { Outlet } from "react-router-dom";


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
    <Theme themePage="home" theme="light">
      <Header>
        <h1>Press and Hold for 1 Second To View the Menu</h1>
      </Header>
      <Outlet />
    </Theme>
    </div>
  )
}
