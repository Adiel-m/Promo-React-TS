import { StringNumberObj } from "../../ts/types"
import { isTrue } from "../../ts/utils"
import { screenSizeRefProps } from "./menu.interfaces"
import { screenSizeRefType } from "./menu.types"

/**  Returns an Array of ALL listItem props that are crossing over the AVAILABLE screen size */
export const getOutOfScreenItemsArr = (
  el: DOMRect,
  screenSize: screenSizeRefProps,
): StringNumberObj[] => {
  const right = screenSize.right
  const bottom = screenSize.bottom
  const leftVal = Math.floor(el.left)
  const topVal = Math.floor(el.top)
  const rightVal = Math.floor(el.right)
  const bottomVal = Math.floor(el.bottom)

  const sides: (StringNumberObj | boolean)[] = [
    leftVal < 0 ? { left: leftVal } : false,
    topVal < 0 ? { top: topVal } : false,
    rightVal > right ? { right: rightVal } : false,
    bottomVal > bottom ? { bottom: bottomVal } : false,
  ]

  const arr = sides.filter((side) => typeof side === 'object')
  return arr
}

/**  Get an Array of Offscreen listItem boundary props */
export const getOffScreenProps = (
  items: React.MutableRefObject<(HTMLLIElement | null)[]>,
  screenSizeRef: screenSizeRefType,
): StringNumberObj[] => {
  const propsArr: (StringNumberObj | null)[] = []
  items.current.map((el) => {
    if (el) {
      const LiRect = el.getBoundingClientRect() // Get the Item Boundary box
      const arr = getOutOfScreenItemsArr(LiRect, screenSizeRef.current) // create Out-of-boundary {side: value} objects Array
      propsArr.push(isTrue(arr) ? { ...arr[0] } : null) // Destruct objects from the Array (null if empty)
    }
  })
  return propsArr.filter((prop) => prop !== null) // return props object Array
}

export const findHighestAbsoluteValues = (arr: StringNumberObj[]): StringNumberObj => {
  const highestValues: StringNumberObj = {}

  arr.map((obj) => {
    const key = Object.keys(obj)[0]
    const value = Math.abs(obj[key])

    if (highestValues[key] === undefined || value > highestValues[key]) {
      highestValues[key] = value
    }
  })

  return highestValues
}

export const calcOffsetReminder = (
  screenVal: StringNumberObj,
  highestVal: StringNumberObj,
) => {
  const offsetReminder: StringNumberObj = {}

  Object.keys(screenVal).map((scrKey) => {
    Object.keys(highestVal).map((highKey) => {
      if (scrKey === highKey) {
        return (offsetReminder[scrKey] = screenVal[scrKey] - highestVal[highKey])
      } else {
        return
      }
    })
  })
  return offsetReminder
}