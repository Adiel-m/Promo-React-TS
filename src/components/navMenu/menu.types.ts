import { screenSizeRefProps } from "./menu.interfaces"

export type MenuRefType = React.RefObject<HTMLUListElement>
export type listItemsRef =  React.MutableRefObject<(HTMLLIElement | null)[]>
export type screenSizeRefType =  React.MutableRefObject<screenSizeRefProps>
