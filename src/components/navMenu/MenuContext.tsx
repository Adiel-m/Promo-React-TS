import {  createContext, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react"
import { Props } from "../../ts/interfaces"
import { MenuContextProps, PositionProps, ScreenSizeProps } from './menu.interfaces'

export const MenuContext = createContext<MenuContextProps>()
export const MenuProvider = ({ children }: Props): React.ReactElement => {

  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [subMenuIsVisible, setSubMenuIsVisible] = useState<boolean>(false)
  const [downTime, setDownTime] = useState<number | null>(null)
  const [downDuration, setDownDuration] = useState<number | null>(null)
  const [downPosition, setDownPosition] = useState<PositionProps>({ x: 0, y: 0 })
  const [upPosition, setUpPosition] = useState<PositionProps>({ x: 0, y: 0 })

  const screenSize = useRef<ScreenSizeProps>({
    width: window.screen.availWidth,
    height: window.screen.availHeight,
  })

  const setDuration = () => {
    if (downTime !== null) {
      const curTime = Date.now()
      setDownDuration(curTime - downTime)
      setDownTime(Date.now())
    }
  }

  const menuPositionAt = () => {
    const menu = document.querySelector('.menu') as HTMLUListElement
    menu.setAttribute(
      'style',
      `transform: translateX(${downPosition.x}px) translateY(${downPosition.y}px);`,
    )
  }

  // Mouse/Touch
  const handleMouseDown = (e: MouseEvent) => {
    setDownPosition({ x: e.clientX, y: e.clientY })
    setDownTime(Date.now())
  }
  const handleMouseUp = (e: MouseEvent) => {
    setDownPosition({ x: e.clientX, y: e.clientY })
    menuPositionAt()
    setDuration()
  }
  const handleTouchStart = (e: TouchEvent) => {
    setDownPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    setDownTime(Date.now())
  }
  const handleTouchEnd = (e: TouchEvent) => {
    setDownPosition({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY })
    setDuration()
  }
  
  // Effects
  useEffect(() => {
    // Show Menu
    if (downDuration !== null && downDuration > 1000) {
      setMenuIsVisible(true)
    }
    
  }, [setMenuIsVisible, downDuration])

  return (
    <MenuContext.Provider
      value={{
        menuIsVisible,
        subMenuIsVisible,
        handleMouseDown,
        handleMouseUp,
        handleTouchStart,
        handleTouchEnd,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}