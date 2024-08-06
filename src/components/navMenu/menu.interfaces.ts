import { MouseEventHandler, TouchEventHandler } from "react"
import { ListItemsRefType, MenuRefType, ScreenSizeRefType } from "./menu.types"
import { To } from "react-router-dom"

export interface MenuContextProps {
  menuIsVisible: boolean
  menuRef: MenuRefType
  listItemsRef: ListItemsRefType
  screenSizeRef: ScreenSizeRefType
  menuPosition: PositionProps
  handleHoverOver: MouseEventHandler
  handleHoverLeave: MouseEventHandler
  handleMouseDown: MouseEventHandler
  handleMouseUp: MouseEventHandler
  handleTouchStart: TouchEventHandler
  handleTouchEnd: TouchEventHandler
}

export interface MenuItemProps {
  itemRef: ListItemsRefType
  itemClass: string
  style: React.CSSProperties | undefined
  linkLabel: string
  linkClass: string
  linkTo: To
  children?: JSX.Element
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