import { MouseEventHandler, TouchEventHandler } from "react"
import { screenSizeRefType } from "./menu.types"

export interface MenuContextProps {
  menuIsVisible: boolean
  subMenuIsVisible: boolean
  showMenu: boolean
  listItemsRef: React.MutableRefObject<(HTMLLIElement | null)[]>
  screenSizeRef: screenSizeRefType
  handleHoverOver: MouseEventHandler
  handleHoverLeave: MouseEventHandler
  handleMouseDown: MouseEventHandler
  handleMouseUp: MouseEventHandler
  handleTouchStart: TouchEventHandler
  handleTouchEnd: TouchEventHandler
}

export interface screenSizeRefProps {
  left: number
  top: number
  right: number
  bottom: number
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
export interface LiBoundaryProps {
  top: number
  right: number
  bottom: number
  left: number
}