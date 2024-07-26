import { screenSizeRefProps } from "./menu.interfaces"

export type MouseEventType = 'touchstart' | 'touchend' | 'mousedown' | 'mouseup' | null

export type screenSizeRefType =  React.MutableRefObject<screenSizeRefProps>