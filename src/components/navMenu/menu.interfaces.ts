import { MouseEventHandler, TouchEventHandler } from "react"

export interface MenuContextProps {
  menuIsVisible: boolean
  subMenuIsVisible: boolean
  showMenu: boolean
  screenSize: React.MutableRefObject<ScreenSizeProps>
  handleHoverOver: MouseEventHandler
  handleHoverLeave: MouseEventHandler
  handleMouseDown: MouseEventHandler
  handleMouseUp: MouseEventHandler
  handleTouchStart: TouchEventHandler
  handleTouchEnd: TouchEventHandler
}

export interface ScreenSizeProps {
  height: number
  width: number
}
export interface PositionProps {
  x: number
  y: number
}
