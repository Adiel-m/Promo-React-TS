import { StrNumObject } from "../../ts/types"
import { isTrue } from "../../ts/utils"
import { ListItemsRefType, MenuRefType, ScreenSizeRefType } from "./menu.types"

export const generateRectObj = (el: (HTMLElement | HTMLDivElement)): StrNumObject => {
  const rect: DOMRect = el.getBoundingClientRect()

  return {
    width: Math.floor(rect.width),
    height: Math.floor(rect.height),
    left: Math.floor(rect.left),
    top: Math.floor(rect.top),
    right: Math.floor(rect.right),
    bottom: Math.floor(rect.bottom),
    x: Math.floor(rect.x),
    y: Math.floor(rect.y),
  }
}

/**  Returns an Array of ALL listItem props that are crossing over the AVAILABLE screen size */
export const getOffscreenItems = ( item: StrNumObject, scr: StrNumObject ): StrNumObject[] => {
  const entries: (StrNumObject | boolean)[] = [
    item.left < 0 ? { left: item.left } : false,
    item.top < 0 ? { top: item.top } : false,
    item.right > scr.width ? { right: item.right } : false,
    item.bottom > scr.height ? { bottom: item.bottom } : false,
  ]
  
  return entries.filter((entry) => typeof entry === 'object')
}

/**  Get an Array of Offscreen listItem boundary props */
export const getOffScreenProps = (
  items: ListItemsRefType,
  scrRect: StrNumObject,
): StrNumObject[] => {
  const entriesArr: (StrNumObject | null)[] = []
  items.current.map((item) => {
    if (item) {
      const itemRect = generateRectObj(item) // Get the Item Boundary box
      const arr = getOffscreenItems(itemRect, scrRect) // create Out-of-boundary {side: value} objects Array
      entriesArr.push(isTrue(arr) ? { ...arr[0] } : null) // Destruct objects from the Array (null if empty)
    }
  })
  return entriesArr.filter((entry) => entry !== null) // return props object Array
}

export const getHighestEntriesInAbsoluteValue = (items: StrNumObject[]): StrNumObject => {
  const entries: StrNumObject = {}

  items.map((item) => {
    const itemKey = Object.keys(item)[0]
    const itemValue = Math.abs(item[itemKey])

    if (entries[itemKey] === undefined || itemValue > entries[itemKey]) {
      entries[itemKey] = itemValue
    }
  })

  return entries
}

export const calcOffsetRemainder = (
  scrRect: StrNumObject,
  entries: StrNumObject,
) => {
  // get the distance remainder
  const newEntries: StrNumObject = {}
  Object.keys(scrRect).map((scrKey) => {
    Object.keys(entries).map((entryKey) => {
      if (scrKey === entryKey) {
        return (newEntries[scrKey] = scrRect[scrKey] - entries[entryKey])
      }
    })
  })
  return {...newEntries}
}

export const repositionMenu = (remainder: StrNumObject, menuEntries: StrNumObject) => {
  const translateMenu: StrNumObject = { x: menuEntries.x, y: menuEntries.y }

  if (Object.keys(remainder).length > 0) {
    // if there are offScreen items
    Object.keys(remainder).map((remKey: string) => {
      Object.keys(menuEntries).map((menuKey: string) => {
        if (menuKey === 'x') {
          if (remKey === 'left') {
            return (translateMenu.x = menuEntries.x - remainder[remKey])
          }
          if (remKey === 'right') {
            return (translateMenu.x = menuEntries.x + remainder[remKey])
          }
        }
        if (menuKey === 'y') {
          if (remKey === 'top') {
            return (translateMenu.x = menuEntries.x - remainder[remKey])
          }
          if (remKey === 'bottom') {
            return (translateMenu.x = menuEntries.x + remainder[remKey])
          }
        }
      })
    })

    return translateMenu
  }
}

export const keepMenuInPageBoundaries = (
  menuRef: MenuRefType,
  screenSizeRef: ScreenSizeRefType,
  listItemsRef: ListItemsRefType,
) => {
  const menuRect = generateRectObj(menuRef.current!)
  const screenRect = generateRectObj(screenSizeRef.current!)

  // Get the properties and values of ALL out-of-screen LI
  const offScreenPropsArr = getOffScreenProps(listItemsRef, screenRect)

  // Filter the furthest LI, with their properties and values
  const highEntries = getHighestEntriesInAbsoluteValue(offScreenPropsArr)

  // Calculate the distance remainder between the furthest LI to the screen boundaries
  const scrEntries: StrNumObject = {
    top: 0,
    right: screenRect.width - 8, // fix menu overflow
    bottom: screenRect.height,
    left: 0,
  }
  const offsetRemainder = calcOffsetRemainder(scrEntries, highEntries)

  // Keep Menu in screen boundaries
  const menuEntries = {
    x: menuRect.x,
    y: menuRect.y,
  }
  return repositionMenu(offsetRemainder, menuEntries)
}