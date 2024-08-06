import { createContext, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react"
import { Props } from "../../ts/interfaces"
import { MenuContextProps, PositionProps } from './menu.interfaces'
import { keepMenuInPageBoundaries } from "./menuUtils"

export const MenuContext = createContext<MenuContextProps>()

export const MenuProvider = ({ children }: Props): React.ReactElement => {
  /* UseState --------------------------------------
  ------------------------------------------------*/
  const [isHover, setIsHover] = useState<boolean>(false)
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [downTime, setDownTime] = useState<number | null>(null)
  const [menuPosition, setMenuPosition] = useState<PositionProps>({x: 0, y: 0})
  const [downDuration, setDownDuration] = useState<number | null>(null)
  const [downPosition, setDownPosition] = useState<PositionProps>({ x: 0, y: 0 })
  const [upPosition, setUpPosition] = useState<PositionProps>({ x: 0, y: 0 })
  /* UseRef ----------------------------------------
  ------------------------------------------------*/
  const menuRef = useRef<HTMLUListElement>()
  const listItemsRef = useRef<HTMLLIElement[]>([])
  const screenSizeRef = useRef<HTMLDivElement>()

  /* Handle Hover ----------------------------------
  ------------------------------------------------*/
  const handleHoverOver = (e: MouseEvent<HTMLLIElement>) => {
    showSubMenu(e)
  }

  const handleHoverLeave = (e: MouseEvent<HTMLLIElement>) => {
    hideSubMenu(e)
  }

  /* Handle Mouse/Touch ----------------------------
  ----------------------------------------------- */
  const validHandle = !isHover
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (validHandle) {
      setDownPosition({ x: e.pageX, y: e.pageY })
      setDownTime(Date.now())
    }
    return
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (validHandle) {
      setUpPosition({ x: e.pageX, y: e.pageY })
      setMenuPosition({x:downPosition.x, y:downPosition.y})
      setDuration()
    }
    return
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (validHandle) {
      setDownPosition({ x: e.touches[0].pageX, y: e.touches[0].pageY })
      setDownTime(Date.now())
    }
    return
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (validHandle) {
      setUpPosition({ x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY })
      setMenuPosition({ x: downPosition.x, y: downPosition.y })
      setDuration()
    }
    return
  }

  /* Helper Functions ------------------------------
  ------------------------------------------------*/
  const setDuration = () => {
    if (downTime !== null) {
      const curTime = Date.now()
      setDownDuration(curTime - downTime)
      setDownTime(Date.now())
    }
  }

  const showSubMenu = (e: MouseEvent<HTMLLIElement>) => {
    const el = e.currentTarget
    el.classList.add('isHover')
    setIsHover(true)

    // Add isHover to sub-menu
    Array.from(el.children).map(
      (ch) => ch.classList.contains('sub-menu') && ch.classList.add('visible'),
    )
  }
  
  const hideSubMenu = (e: MouseEvent<HTMLLIElement>) => {
    const el = e.currentTarget
    el.classList.remove('isHover')
    setIsHover(false)

    // Remove isHover from sub-menu
    Array.from(el.children).map(
      (ch) =>
        ch.classList.contains('sub-menu') &&
        setTimeout(() => {
          if (!el.classList.contains('isHover')) {
            ch.classList.remove('visible')
          }
        }, 250),
    )
  }

  /* Effects ---------------------------------------
  ------------------------------------------------*/
  useEffect(() => {
    // Initiate Menu Position at center
    
    // Show menu after a delay
    const showMenuDelay = (delay: number) => {
      if (downDuration !== null && downDuration > delay) {
        setMenuIsVisible(true)
      }
    }
    showMenuDelay(500)
    
    // Keep the Menu in page boundaries
    if (menuIsVisible && !isHover) {
      const menuPos = keepMenuInPageBoundaries(menuRef, screenSizeRef, listItemsRef)

      if (menuPos) {
        setMenuPosition({x:menuPos.x, y:menuPos.y})
      }
    }
  }, [isHover, downDuration, menuIsVisible])
  
  /* Return ----------------------------------------
  ------------------------------------------------*/
  return (
    <MenuContext.Provider
      value={{
        menuIsVisible,
        listItemsRef,
        menuRef,
        screenSizeRef,
        menuPosition,
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