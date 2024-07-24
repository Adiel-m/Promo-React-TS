import { useContext } from "react";
import { NavMenu } from "./components/navMenu/Menu";
import { MenuContext } from "./components/navMenu/MenuContext";


export default function App() {
  const { handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd } =
    useContext(MenuContext)
  
  return (
    <div
      style={{ minHeight: '100dvh' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h1>Press and Hold for 1 Second To View the Menu</h1>
      <NavMenu />
    </div>
  )
}