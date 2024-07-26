import { screenSizeRefProps } from "../components/navMenu/menu.interfaces"
import { PageThemeProps } from "./interfaces"

export const isObj = <T>(arg: T): boolean => {
  return (
    typeof arg === 'object' &&
    // exclude Array because array is type of object
    !Array.isArray(arg) &&
    // exclude Null because null is type of object
    arg !== null
  )
}

export const isTrue = <T>(arg: T): boolean => {
  // check if Array is empty and set to false
  if (Array.isArray(arg) && !arg.length) {
    return false
  }
  // check if Object is empty and set to false
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    return false
  }
  return !!arg
}

export const validateImageExtension = (file: string):  boolean => {
  const allowedExtension = [
    '.png',
    '.avif',
    '.gif',
    '.jpg',
    '.jpeg',
    '.svg',
    '.webp',
  ]
  const ext = getExtension(file)
  return allowedExtension.indexOf(ext) !== -1
    ? true
    : createErr(`File is not a valid image type. \n File: ${file}`)
}

export const createErr = (errMsg: string) => {
    throw new Error(errMsg);
};

export const getExtension = (file: string): string => {
  const ext = file.slice(file.lastIndexOf('.'))
  return ext ? ext : 'File Extension is Missing'
}

export const pageAndThemeModeStyles = ({ pageTheme, pageThemeMode }: PageThemeProps) => {
  const body = document.querySelector('body')!
  pageThemeMode === 'dark'
    ? body.classList.add(pageTheme, pageThemeMode)
    : body.classList.add(pageTheme)
}

/**  Returns an Array of ALL listItem props that are crossing over the AVAILABLE screen size */
export const getOutOfScreenItemsArr = (el: DOMRect, screenSize: screenSizeRefProps): object[] => {
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
  screenSizeRef: React.MutableRefObject<screenSizeRefProps>,
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