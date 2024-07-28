import { createContext, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react"
import { Props } from "../../ts/interfaces"
import { MenuContextProps, PositionProps, screenSizeRefProps } from './menu.interfaces'
import { listItemsRef, screenSizeRefType } from "./menu.types"
import { calcOffsetReminder, findHighestAbsoluteValues, getOffScreenProps } from "./menuUtils"
import { StringNumberObj } from "../../ts/types"

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
  const listItemsRef: listItemsRef = useRef<(HTMLLIElement | null)[]>([])

  const screenSizeRef: screenSizeRefType = useRef<screenSizeRefProps>({
    left: 0,
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  })
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
    console.log('New Render')
    // Show menu after a delay
    const showMenuDelay = (delay: number) => {
      if (downDuration !== null && downDuration > delay) {
        setMenuIsVisible(true)
      }
    }
    showMenuDelay(500)

    // Keep the Menu in screen boundaries
    const offScreenPropsArr = getOffScreenProps(listItemsRef, screenSizeRef)
    const highestValues = findHighestAbsoluteValues(offScreenPropsArr)
    const screenVal = screenSizeRef.current as unknown as StringNumberObj
    const offsetReminder = calcOffsetReminder(screenVal, highestValues)
    console.log(offsetReminder)
  })  
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