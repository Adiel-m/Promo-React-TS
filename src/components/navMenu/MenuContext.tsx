import { createContext, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react"
import { Props } from "../../ts/interfaces"
import { MenuContextProps, PositionProps, screenSizeRefProps } from './menu.interfaces'
import { outOfScreenItemsArr, isTrue } from "../../ts/utils"

export const MenuContext = createContext<MenuContextProps>()

export const MenuProvider = ({ children }: Props): React.ReactElement => {
  /* UseState --------------------------------------
  ------------------------------------------------*/
  const [isHover, setIsHover] = useState<boolean>(false)
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [subMenuIsVisible, setSubMenuIsVisible] = useState<boolean>(false)
  const [downTime, setDownTime] = useState<number | null>(null)
  const [downDuration, setDownDuration] = useState<number | null>(null)
  const [downPosition, setDownPosition] = useState<PositionProps>({ x: 0, y: 0 })
  const [upPosition, setUpPosition] = useState<PositionProps>({ x: 0, y: 0 })

  /* UseRef ----------------------------------------
  ------------------------------------------------*/
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([])

  const screenSizeRef = useRef<screenSizeRefProps>({width: window.screen.availWidth, height: window.screen.availHeight})

  /* Helper Functions ------------------------------
  ------------------------------------------------*/
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

  const showMenuDelay = (delay: number) => {
        if (downDuration !== null && downDuration > delay) {
          setMenuIsVisible(true)
        }
  }

  /* Handle Hover ----------------------------------
  ------------------------------------------------*/
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

  /* Handle Mouse/Touch ----------------------------
  ----------------------------------------------- */
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

  /* Effects ---------------------------------------
  ------------------------------------------------*/
  useEffect(() => {
    showMenuDelay(500)

    // Keep the Menu in screen boundaries 
    console.log("New Render");
    listItemsRef.current.map((el) => {
      if (el) {
        const LiRect: DOMRect = el.getBoundingClientRect() // Get List Item Boundary box
        const arr: object[] = outOfScreenItemsArr(LiRect, screenSizeRef.current) // Out of boundary {side: value} objects Array
        const outOfBoundaryEl: object | null = isTrue(arr) ? { ...arr[0] } : null // Destruct objects from the Array (null if empty)

        console.log(outOfBoundaryEl)
      }
      })

  }, [setMenuIsVisible, downDuration, listItemsRef])
  
  /* Return ----------------------------------------
  ------------------------------------------------*/
  return (
    <MenuContext.Provider
      value={{
        menuIsVisible,
        subMenuIsVisible,
        listItemsRef,
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