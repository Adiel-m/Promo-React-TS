import { createContext, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react"
import { Props } from "../../ts/interfaces"
import { MenuContextProps, PositionProps, screenSizeRefProps } from './menu.interfaces'
import { listItemsRef, MenuRefType, screenSizeRefType } from "./menu.types"
import { calcOffsetRemainder, findHighestAbsoluteValues, getOffScreenProps } from "./menuUtils"
import { StringNumberObj } from "../../ts/types"

export const MenuContext = createContext<MenuContextProps>()

export const MenuProvider = ({ children }: Props): React.ReactElement => {
  /* UseState --------------------------------------
  ------------------------------------------------*/
  const [isHover, setIsHover] = useState<boolean>(false)
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [subMenuIsVisible, setSubMenuIsVisible] = useState<boolean>(false)
  const [downTime, setDownTime] = useState<number | null>(null)
  const [menuPosition, setMenuPosition] = useState<PositionProps>({x: 0, y: 0})
  const [downDuration, setDownDuration] = useState<number | null>(null)
  const [downPosition, setDownPosition] = useState<PositionProps>({ x: 0, y: 0 })
  const [upPosition, setUpPosition] = useState<PositionProps>({ x: 0, y: 0 })
  /* UseRef ----------------------------------------
  ------------------------------------------------*/
  const menuRef: MenuRefType = useRef<HTMLUListElement>(null)
  const listItemsRef: listItemsRef = useRef<(HTMLLIElement | null)[]>([])
  const screenSizeRef: screenSizeRefType = useRef<screenSizeRefProps>({
    left: 0,
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  })
  
  const screenVal = screenSizeRef.current as unknown as StringNumberObj

  /* Handle Hover ----------------------------------
  ------------------------------------------------*/
  const handleHoverOver = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    const el = e.target as HTMLLIElement
    el.classList.add('isHover')
    setIsHover(true)
  }

  const handleHoverLeave = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    const el = e.target as HTMLLIElement
    el.classList.remove('isHover')
    setIsHover(false)
  }

  /* Handle Mouse/Touch ----------------------------
  ----------------------------------------------- */
  const validHandle = !isHover
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (validHandle) {
      setDownPosition({ x: e.clientX, y: e.clientY })
      setDownTime(Date.now())
    }
    return
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (validHandle) {
      setUpPosition({ x: e.clientX, y: e.clientY })
      menuPositionAt(downPosition.x, downPosition.y)
      setDuration()
    }
    return
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (validHandle) {
      setDownPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      setDownTime(Date.now())
    }
    return
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (validHandle) {
      setUpPosition({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY })
      menuPositionAt(downPosition.x, downPosition.y)
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

  const menuPositionAt = (x: number, y: number) => {
    setMenuPosition({x, y})
  }



  /* Effects ---------------------------------------
  ------------------------------------------------*/
  useEffect(() => {
    // Initiate Menu Position at center
      const menuPositionFirstInit = () => {
        if (!menuIsVisible) {
          const x = screenSizeRef.current.right / 2
          const y = screenSizeRef.current.bottom / 2
          menuPositionAt(x, y)
        }
      }
      menuPositionFirstInit()

    // Show menu after a delay
    const showMenuDelay = (delay: number) => {
      if (downDuration !== null && downDuration > delay) {
        setMenuIsVisible(true)
      }
    }
    showMenuDelay(500)

    // Keep the Menu in screen boundaries
    if (menuIsVisible && !isHover) {
      // Get the properties and values of ALL out-of-screen LI
      const offScreenPropsArr = getOffScreenProps(listItemsRef, screenSizeRef)

      // Filter the furthest LI, with their properties and values
      const highestValues = findHighestAbsoluteValues(offScreenPropsArr)

      // Calculate the distance remainder between the furthest LI to the screen boundaries
      const offsetRemainder = calcOffsetRemainder(screenVal, highestValues)

      // Reposition the Menu into the screen boundaries
      const repositionMenu = (offsetRemainder: StringNumberObj, menuRef: MenuRefType) => {
        const menuBoundary = menuRef.current!.getBoundingClientRect()
        const menuPos = { x: Math.floor(menuBoundary?.x), y: Math.floor(menuBoundary?.y) }

        if (Object.keys(offsetRemainder).length !== 0) {
          // validate that the Menu is offScreen
          // Reposition the Menu
          if (menuRef.current) {
            Object.keys(offsetRemainder).map((key) => {
              switch (key) {
                case 'left': {
                  // Offset the menu X(px) right
                  const offsetX = menuPos.x - offsetRemainder['left']
                  return menuPositionAt(offsetX, menuPos.y)
                }
                case 'top': {
                  // Offset the menu Y(px) down
                  const offsetY = menuPos.y - offsetRemainder['top']
                  return menuPositionAt(menuPos.x, offsetY)
                }
                case 'right': {
                  // Offset the menu Y(px) left
                  const offsetX = menuPos.x + offsetRemainder['right']
                  return menuPositionAt(offsetX, menuPos.y)
                }
                case 'bottom': {
                  // Offset the menu Y(px) up
                  const offsetY = menuPos.y + offsetRemainder['bottom']
                  return menuPositionAt(menuPos.x, offsetY)
                }
                default:
                  break
              }
            })
          }
        }
      }
      repositionMenu(offsetRemainder, menuRef)
    }
  }, [isHover, downDuration, screenVal, menuIsVisible])

  /* Return ----------------------------------------
  ------------------------------------------------*/
  return (
    <MenuContext.Provider
      value={{
        menuIsVisible,
        subMenuIsVisible,
        listItemsRef,
        menuRef,
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