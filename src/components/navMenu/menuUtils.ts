import { isTrue } from "../../ts/utils"
import { screenSizeRefProps } from "./menu.interfaces"
import { screenSizeRefType } from "./menu.types"

/**  Returns an Array of ALL listItem props that are crossing over the AVAILABLE screen size */
export const getOutOfScreenItemsArr = (
  el: DOMRect,
  screenSize: screenSizeRefProps,
): object[] => {
  const width = screenSize.width
  const height = screenSize.height
  const leftVal = Math.floor(el.left)
  const topVal = Math.floor(el.top)
  const rightVal = Math.floor(el.right)
  const bottomVal = Math.floor(el.bottom)

  const sides = [
    leftVal < 0 ? { left: leftVal } : false,
    topVal < 0 ? { top: topVal } : false,
    rightVal > width ? { right: rightVal } : false,
    bottomVal > height ? { bottom: bottomVal } : false,
  ]

  const arr = sides.filter((side) => typeof side === 'object')
  return arr
}

/**  Get an Array of Offscreen listItem boundary props */
export const getOffScreenProps = (
  items: React.MutableRefObject<(HTMLLIElement | null)[]>,
  screenSizeRef: screenSizeRefType,
): object[] | [] => {
  const propsArr: (object | null)[] = []
  items.current.map((el) => {
    if (el) {
      const LiRect: DOMRect = el.getBoundingClientRect() // Get the Item Boundary box
      const arr: object[] = getOutOfScreenItemsArr(LiRect, screenSizeRef.current) // create Out-of-boundary {side: value} objects Array
      propsArr.push(isTrue(arr) ? { ...arr[0] } : null) // Destruct objects from the Array (null if empty)
    }
  })
  return propsArr.filter((prop) => prop !== null) // return props object Array
}
