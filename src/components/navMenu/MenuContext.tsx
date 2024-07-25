import {  createContext, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react"
import { Props } from "../../ts/interfaces"
import { MenuContextProps, PositionProps, ScreenSizeProps } from './menu.interfaces'

export const MenuContext = createContext<MenuContextProps>()
export const MenuProvider = ({ children }: Props): React.ReactElement => {

  const [isHover, setIsHover] = useState<boolean>(false)
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

  // Handle Hover
  const handleHoverOver = (e: MouseEvent<HTMLLIElement>) => {
    const el: HTMLLIElement = e.target
    e.stopPropagation()
    el.classList.add('isHover')
    setIsHover(true)
  }

  const handleHoverLeave = (e: MouseEvent<HTMLLIElement>) => {
    const el: HTMLLIElement = e.target
    e.stopPropagation()
    el.classList.remove('isHover')
    setIsHover(false)
  }

  // Handle Mouse/Touch
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHover || !menuIsVisible) {
      setDownPosition({ x: e.clientX, y: e.clientY })
      setDownTime(Date.now())
    }
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHover || !menuIsVisible) {
      setUpPosition({ x: e.clientX, y: e.clientY })
      menuPositionAt()
      setDuration()
    }
  }
  
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!isHover || !menuIsVisible) {
      setDownPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      setDownTime(Date.now())
    }
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!isHover || !menuIsVisible) {
      setUpPosition({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY })
      menuPositionAt()
      setDuration()
    }
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
        handleHoverOver,
        handleHoverLeave,
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