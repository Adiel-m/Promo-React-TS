import { MouseEventHandler, TouchEventHandler } from "react"

export interface MenuContextProps {
  menuIsVisible: boolean
  subMenuIsVisible: boolean
  showMenu: boolean
  listItemsRef: React.MutableRefObject<(HTMLLIElement | null)[]>
  screenSizeRef: React.MutableRefObject<screenSizeRefProps>
  handleHoverOver: MouseEventHandler
  handleHoverLeave: MouseEventHandler
  handleMouseDown: MouseEventHandler
  handleMouseUp: MouseEventHandler
  handleTouchStart: TouchEventHandler
  handleTouchEnd: TouchEventHandler
}

export interface screenSizeRefProps {
  height: number
  width: number
}
export interface PositionProps {
  x: number
  y: number
}

export interface BoundingProps {
  id: number
  data: {
    x: number
    y: number
    width: number
    height: number
    top: number
    right: number
    bottom: number
    left: number
  }
}