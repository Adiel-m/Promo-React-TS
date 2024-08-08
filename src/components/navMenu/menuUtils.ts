import { StrNumObject } from "../../ts/types"
import { isTrue } from "../../ts/utils"
import { ListItemsRefType } from "./menu.types"

/** Return BoundingClientRect  */
export const setRect = (el: HTMLElement | HTMLDivElement): DOMRect => {
  return el.getBoundingClientRect()
}

/** Return a BoundingClientRect Array  */
export const setRectArr = (elArr: (HTMLElement | HTMLDivElement)[]): DOMRect[] => {
  let arr: DOMRect[] = []
  elArr.map((el) => arr = [...arr, setRect(el)])

  return arr
}

/** Convert BoundingClientRect to Object  */
export const toRectObject = (el: (HTMLElement | HTMLDivElement)): StrNumObject => {
  const rect = setRect(el) as unknown as StrNumObject
  const obj: StrNumObject = {}

  for (const key in rect) {
    const val = rect[key]
    obj[key] = Math.floor(val)
  }

  return obj
}

/** Convert BoundingClientRect Array to Objects Array */
export const toRectObjectArr = (refEl: ListItemsRefType): StrNumObject[] => {
  const elArr = { ...refEl }
  let arr: StrNumObject[] = []

  elArr.current.map((el) => {
    const newEl = toRectObject(el)
    return arr = [...arr, newEl]
  })

  return arr
}

/** Compare if entries sides are over the boundary    
 * Return out-of-boundary object entries  */
export const outOfBoundaryEntries = (obj: StrNumObject, boundary: StrNumObject): StrNumObject => {
  const newObj: StrNumObject = {}

  if (obj.left < boundary.left) {
    newObj.left = obj.left
  }
  if (obj.top < boundary.top) {
    newObj.top = obj.top
  }
  if (obj.right > boundary.right) {
    newObj.right = obj.right
  }
  if (obj.bottom > boundary.bottom) {
    newObj.bottom = obj.bottom
  }

  return newObj
}

/** Iterate over an Array of objects  
 * Compare if entries sides are over the boundary  
 * Return an Array of All out-of-boundary objects entries */
export const outOfBoundaryObjectsEntriesArr = ( refEl: ListItemsRefType, boundary: StrNumObject, ) => {
  const elArr = toRectObjectArr(refEl)
  let arr: StrNumObject[] = []

  elArr.map((el) => {
    const newEl = outOfBoundaryEntries(el, boundary)

    if (isTrue(newEl)) {
      arr = [...arr, newEl]
    }
  })

  return arr
}

/** Convert an ARRAY of boundary objects to a SINGLE boundary object  
 * Compare all values and find:  
 * * Lowest Negative Values (left, top)  
 * * Highest Positive Values (right, bottom, width, height, x, y)  
 * Return an Object entries (right, bottom, width, height,) */
export const toSingleBoundaryObject = (elArr: StrNumObject[]): StrNumObject => {
  const obj: StrNumObject = {}

  elArr.map((el) => {
    Object.keys(el).map((entry) => {
      const value = el[entry]

      // set the highest value
      if (entry === 'left' || entry === 'top') {
        if (obj[entry] === undefined || value < obj[entry]) {
          obj[entry] = Math.floor(value)
        }
      } else {
        if (obj[entry] === undefined || value > obj[entry]) {
          obj[entry] = Math.floor(value)
        }
      }
    })
  })

  return obj
}

/** return left, top, right, bottom Object */
export const setBoundarySides = (obj: StrNumObject | DOMRect): StrNumObject => {
  return {
    left: obj.left,
    top: obj.top,
    right: obj.right,
    bottom: obj.bottom,
    width: obj.width,
    height: obj.height,
    x: obj.x,
    y: obj.bottom,
  }
}

/** return left, top, right, bottom Objects Array */
export const setBoundarySidesArray = (objArr: (StrNumObject | DOMRect)[]): StrNumObject[] => {
  let arr: StrNumObject[] = []
  
  objArr.map(obj =>{
    const objBoundaries = setBoundarySides(obj)
    arr = [...arr, objBoundaries]})
  return arr
}

/** Calculate the remainder between the object and boundary  
 * Return the matching entries*/
export const boundaryEntryRemainder = (obj: StrNumObject, boundary: StrNumObject) => {
  const newObj: StrNumObject = {}

  for (const entry in obj) {
    for (const key in boundary) {
      if (entry === key) {
        if (entry === 'left' || entry === 'top') {
          newObj[entry] = Math.abs(obj[entry])
        } else {
          newObj[entry] = obj[entry] - boundary[key]
        }
      }
    }
  } 
  
  return newObj
}

/** Shift the object to new coordinates by the remainder  
 * Return object coordinates entries */
export const deflectByRemainder = (obj: StrNumObject, reminder: StrNumObject) => {
  const newObj: {x: number, y: number} = {x: obj.x, y: obj.y} 
  Object.keys(reminder).map(entry => {
    if (entry === 'left') {
      newObj.x = obj.x + reminder[entry]
    }
    if (entry === 'top') {
      newObj.x = obj.y + reminder[entry]
    }
    if (entry === 'right') {
      newObj.x = obj.x - reminder[entry] - 32 // 32 fix overflow issue
    }
    if (entry === 'bottom') {
      newObj.y = obj.y - reminder[entry]
    }
  })
  return newObj
}

export const menuStartPosition = (el: HTMLUListElement, scroll: StrNumObject) => {
  const menuRect = toRectObject(el)

  return {
    x: Math.floor(menuRect.x + scroll.x),
    y: Math.floor(menuRect.y + scroll.y),
  }
}