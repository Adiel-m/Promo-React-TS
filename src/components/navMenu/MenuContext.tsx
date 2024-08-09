import { createContext, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react"
import { Props } from "../../ts/interfaces"
import { MenuContextProps } from './menu.interfaces'
import { 
  menuAxisLimit,
  axisLimitInit
} from "./menuUtils"
import { StrNumObject } from "../../ts/types"

export const MenuContext = createContext<MenuContextProps>()

export const MenuProvider = ({ children }: Props): React.ReactElement => {
  /* UseState --------------------------------------
  ------------------------------------------------*/
  const [isHover, setIsHover] = useState<boolean>(false)
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [downTime, setDownTime] = useState<number | null>(null)
  const [menuPosition, setMenuPosition] = useState<StrNumObject>({ x: 0, y: 0 })
  const [downDuration, setDownDuration] = useState<number | null>(null)
  const [axisLimit, setAxisLimit] = useState<StrNumObject>()
  const [newPos, setNewPos] = useState<StrNumObject>()
  /* UseRef ----------------------------------------
  ------------------------------------------------*/
  const menuRef = useRef<HTMLUListElement>()
  const listItemsRef = useRef<HTMLLIElement[]>([])
  const screenSizeRef = useRef<HTMLDivElement>()

  // const docSize = useMemo( )
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
      setNewPos(menuAxisLimit({ x: e.pageX, y: e.pageY }, axisLimit!))
      setDownTime(Date.now())
    }
    return
  }
  
  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (validHandle) {
        setMenuPosition(newPos!)
      setDuration()
    }
    return
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (validHandle) {
      setNewPos(
        menuAxisLimit(
          { x: e.touches[0].pageX, y: e.touches[0].pageY },
          axisLimit!,
        ),
      )
      setDownTime(Date.now())
    }
    return
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (validHandle) {
      setMenuPosition(newPos!)
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
    // Limit the x, y menu positioning (prevent overflow)
    setAxisLimit(axisLimitInit(menuRef, listItemsRef))

    // Show menu after a delay
    const showMenuDelay = (delay: number) => {
      if (downDuration !== null && downDuration > delay) {
        setMenuIsVisible(true)
      }
    }
    showMenuDelay(500)
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